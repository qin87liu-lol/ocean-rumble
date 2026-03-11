const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  backgroundColor: '#0a3d62',
  parent: 'game-container',
  scene: [
    BootScene,
    TitleScene,
    AnimalSelectScene,
    MathQuizScene,
    PowerUpScene,
    BattleScene,
    BattleResultScene,
    VictoryScene,
    GameOverScene,
  ],
  scale: {
    mode: Phaser.Scale.NONE,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  input: {
    activePointers: 3,
  },
};

const game = new Phaser.Game(config);
