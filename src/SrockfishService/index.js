const fs = require('fs');
const { spawn } = require('child_process');
const { DifficutlyConfigs } = require('./difficulty');

class StockfishService {
  getStockfishPath() {
    const possiblePaths = [
      '/usr/games/stockfish',
      '/usr/bin/stockfish',
      '/usr/local/bin/stockfish',
    ];

    for (const possiblePath of possiblePaths) {
      try {
        fs.accessSync(possiblePath);
        return possiblePath;
      } catch (e) {
        continue;
      }
    }
    throw new Error('Stockfish binary not found');
  }

  async bestMove(fen, difficulty) {
    const configs = DifficutlyConfigs[difficulty];

    return new Promise((resolve, reject) => {
      const engine = spawn(this.getStockfishPath());

      engine.stdout.on('data', (data) => {
        if (data.includes('uciok')) {
          engine.stdin.write(`setoption name Skill Level value ${configs.skill}\n`);
          engine.stdin.write(`setoption name Contempt value ${configs.contempt}\n`);
          engine.stdin.write(`setoption name Randomness value ${configs.randomness}\n`);
          engine.stdin.write(`setoption name MultiPV value 1\n`);
          engine.stdin.write(`position fen ${fen}\n`);
          engine.stdin.write(`go depth ${configs.depth}\n`);
        }

        const line = data.toString();

        const bestMoveMatch = line.match(/bestmove (\w+)/);
        if (bestMoveMatch) {
          engine.kill();
          resolve(bestMoveMatch[1]);
        }
      });
      engine.stdin.write(`uci\n`);

      engine.stderr.on('data', (data) => {
        console.error('Stockfish error:', data.toString());
      });

      engine.on('error', (error) => {
        reject(new Error(`Stockfish failed to start: ${error.message}`));
      });

      setTimeout(() => {
        engine.kill();
        reject(new Error('Stockfish analysis timeout'));
      }, 30000);
    });
  }
}

const stockfishService = new StockfishService();

module.exports = { stockfishService };
