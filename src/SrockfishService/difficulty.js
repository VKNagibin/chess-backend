const DifficutlyConfigs = {
  beginner: {
    depth: 5,
    skill: 0,
    maxTime: 1000,
    randomness: 50,
    contempt: 150,
  },
  intermediate: {
    depth: 12,
    skill: 10,
    randomness: 20,
    contempt: 0,
  },
  grandmaster: {
    depth: 22,
    skill: 20,
    randomness: 0,
    contempt: -50,
  },
};

const DifficultyLevels = {
  BEGINNER: 'beginner',
  INTERMEDIATE: 'intermediate',
  GRANDMASTER: 'grandmaster',
};

const difficultyLevelsList = Object.values(DifficultyLevels);

const checkValidDifficulty = difficulty => difficultyLevelsList.includes(difficulty);

module.exports = { DifficutlyConfigs, DifficultyLevels, checkValidDifficulty };
