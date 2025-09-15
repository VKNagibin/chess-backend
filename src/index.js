const express = require('express');
const cors = require('cors');
const { stockfishService } = require('./SrockfishService');
const { DifficultyLevels, checkValidDifficulty } = require('./SrockfishService/difficulty');

const app = express();

app.use(express.json());

app.use(cors());

const port = process.env.PORT || 3000;

app.get('/api', (req, res) => {
  res.json({ message: 'API is working!', status: 'OK' });
});

app.post('/api/best-move', async (req, res) => {
  try {
    const { fen, difficulty = DifficultyLevels.INTERMEDIATE } = req.body;

    if (!checkValidDifficulty(difficulty)) {
      return res.status(400).json({
        success: false,
        error: 'Incorrect difficulty parameter',
        code: 'INCORRECT_DIFFICULTY',
      });
    }

    if (!fen) {
      return res.status(400).json({
        error: 'FEN parameter is required',
        code: 'MISSING_FEN',
      });
    }

    const result = await stockfishService.bestMove(fen, difficulty);

    res.json({
      success: true,
      data: result,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
      code: 'ANALYSIS_ERROR',
    });
  }
});

app.use(error => {
  console.error('Error:', error);
  // res.status(500).json({
  //   error: error.message,
  //   code: 'INTERNAL_ERROR',
  // });
});

app.listen(port, () => {
  console.log(`♟️ Chess analysis server running on port ${port}`);
  console.log(`📊 Health check: http://localhost:${port}/health`);
});
