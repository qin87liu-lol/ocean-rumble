class GameOverScene extends Phaser.Scene {
  constructor() { super('GameOver'); }

  create() {
    drawOceanBg(this);
    this.add.rectangle(400, 300, 800, 600, 0x000000, 0.45);

    this.add.text(400, 110, '💀 Game Over 💀', {
      fontSize: '46px', fill: '#e84118',
      fontFamily: 'Arial Black, Arial', stroke: '#000', strokeThickness: 6
    }).setOrigin(0.5);

    this.add.text(400, 185, `Your ${GameState.selectedAnimalName} fought bravely!`, {
      fontSize: '22px', fill: '#ffffff', fontFamily: 'Arial'
    }).setOrigin(0.5);

    // Defeated animal (faded)
    this.add.image(400, 285, 'animals', GameState.selectedAnimal)
      .setScale(7).setAlpha(0.4).setTint(0xaaaaaa);

    this.add.text(400, 365, `You reached Round ${GameState.round} of 4`, {
      fontSize: '20px', fill: '#ffe066', fontFamily: 'Arial'
    }).setOrigin(0.5);

    // Score breakdown
    if (GameState.roundScores.length > 0) {
      const scoreLines = GameState.roundScores
        .map(({ round, score }) => `Round ${round}: ${score}/15`)
        .join('   ');

      this.add.text(400, 400, scoreLines, {
        fontSize: '15px', fill: '#aaaaaa', fontFamily: 'Arial'
      }).setOrigin(0.5);

      this.add.text(400, 426, `Total Math Score: ${GameState.totalScore} ⭐`, {
        fontSize: '18px', fill: '#ffe066', fontFamily: 'Arial'
      }).setOrigin(0.5);
    }

    this.add.text(400, 458, 'Keep practicing your math!', {
      fontSize: '17px', fill: '#aaaaaa', fontFamily: 'Arial'
    }).setOrigin(0.5);

    const retryBtn = this.add.text(294, 510, '🔄 Try Again', {
      fontSize: '23px', fill: '#ffffff',
      backgroundColor: '#e67e22',
      fontFamily: 'Arial Black, Arial',
      padding: { x: 20, y: 12 }, stroke: '#000', strokeThickness: 3
    }).setOrigin(0.5).setInteractive({ useHandCursor: true });

    const titleBtn = this.add.text(510, 510, '🏠 Main Menu', {
      fontSize: '23px', fill: '#ffffff',
      backgroundColor: '#2980b9',
      fontFamily: 'Arial Black, Arial',
      padding: { x: 20, y: 12 }, stroke: '#000', strokeThickness: 3
    }).setOrigin(0.5).setInteractive({ useHandCursor: true });

    retryBtn.on('pointerup', () => {
      SoundManager.click();
      GameState.reset();
      this.scene.start('AnimalSelect');
    });
    titleBtn.on('pointerup', () => {
      SoundManager.click();
      GameState.reset();
      this.scene.start('Title');
    });
  }
}
