const GameState = {
  selectedAnimal: 0,
  selectedAnimalName: 'Shark',
  round: 1,
  lives: 3,
  quizScore: 0,
  totalScore: 0,
  roundScores: [],
  usedEnemyFrames: [],
  powerTier: 'Normal',
  playerStats: { hp: 3, fireRate: 'Normal', projectileSize: 'Small' },

  reset() {
    this.selectedAnimal     = 0;
    this.selectedAnimalName = 'Shark';
    this.round              = 1;
    this.lives              = 3;
    this.quizScore          = 0;
    this.totalScore         = 0;
    this.roundScores        = [];
    this.usedEnemyFrames    = [];
    this.powerTier          = 'Normal';
  },

  calculatePowerTier(score) {
    if (score >= 12) return 'Max Power';
    if (score >= 8)  return 'Strong';
    if (score >= 4)  return 'Normal';
    return 'Weak';
  },

  applyStats(tier) {
    this.powerTier = tier;
    const tiers = {
      'Max Power': { hp: 5, fireRate: 'Fast',   projectileSize: 'Large'  },
      'Strong':    { hp: 4, fireRate: 'Medium',  projectileSize: 'Medium' },
      'Normal':    { hp: 3, fireRate: 'Normal',  projectileSize: 'Small'  },
      'Weak':      { hp: 2, fireRate: 'Slow',    projectileSize: 'Tiny'   },
    };
    this.playerStats = tiers[tier];
  },

  // Win probability for simulated battle (Milestone 1 fallback)
  calcWinChance() {
    const base = { 'Max Power': 90, 'Strong': 72, 'Normal': 50, 'Weak': 28 };
    const roundPenalty = (this.round - 1) * 8;
    return Math.max(10, base[this.powerTier] - roundPenalty);
  },

  addRoundScore(score) {
    this.roundScores.push({ round: this.round, score });
    this.totalScore += score;
  },
};
