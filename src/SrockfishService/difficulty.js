const DifficutlyConfigs = {
  beginner: {
    depth: 1,
    skill: 0,
    maxTime: 500,
    randomness: 100,
    contempt: 200,
  },
  medium: {
    depth: 5,
    skill: 5,
    maxTime: 2000,
    randomness: 20,
    contempt: 100,
  },
  intermediate: {
    depth: 12,
    skill: 12,
    randomness: 12,
    contempt: 50,
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
  MEDIUM: 'medium',
  INTERMEDIATE: 'intermediate',
  GRANDMASTER: 'grandmaster',
};

const difficultyLevelsList = Object.values(DifficultyLevels);

const checkValidDifficulty = (difficulty) => difficultyLevelsList.includes(difficulty);

module.exports = { DifficutlyConfigs, DifficultyLevels, checkValidDifficulty };
