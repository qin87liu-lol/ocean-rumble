class VictoryScene extends Phaser.Scene {
  constructor() { super('Victory'); }

  create() {
    drawOceanBg(this);
    SoundManager.victory();

    // Confetti burst from center
    const colors = [0xffe066, 0xe84118, 0x27ae60, 0x00d2ff, 0xff6b6b, 0xaa44ff];
    for (let i = 0; i < 40; i++) {
      const x = Phaser.Math.Between(100, 700);
      const y = Phaser.Math.Between(550, 700);
      const c = this.add.circle(x, y, Phaser.Math.Between(5, 14),
        Phaser.Utils.Array.GetRandom(colors));
      this.tweens.add({
        targets: c,
        y: y - Phaser.Math.Between(600, 900),
        x: x + Phaser.Math.Between(-100, 100),
        alpha: 0,
        duration: Phaser.Math.Between(1800, 3800),
        delay: Phaser.Math.Between(0, 1000),
        repeat: -1,
        ease: 'Quad.easeOut'
      });
    }

    this.add.text(400, 90, '🏆 OCEAN RUMBLE 🏆', {
      fontSize: '38px', fill: '#ffe066',
      fontFamily: 'Arial Black, Arial', stroke: '#000', strokeThickness: 6
    }).setOrigin(0.5);

    this.add.text(400, 155, 'CHAMPION!', {
      fontSize: '56px', fill: '#ffffff',
      fontFamily: 'Arial Black, Arial', stroke: '#e84118', strokeThickness: 7
    }).setOrigin(0.5);

    // Winner animal — big + bobbing
    const hero = this.add.image(400, 280, 'animals', GameState.selectedAnimal).setScale(8);
    this.tweens.add({
      targets: hero, y: 292, duration: 900,
      yoyo: true, repeat: -1, ease: 'Sine.easeInOut'
    });

    this.add.text(400, 350, GameState.selectedAnimalName, {
      fontSize: '22px', fill: '#00d2ff',
      fontFamily: 'Arial Black, Arial', stroke: '#000', strokeThickness: 3
    }).setOrigin(0.5);

    this.add.text(400, 390, 'You defeated all 4 ocean bosses!', {
      fontSize: '20px', fill: '#ffffff', fontFamily: 'Arial'
    }).setOrigin(0.5);

    // Score breakdown
    const maxPossible = GameState.roundScores.length * 15;
    const scoreLines  = GameState.roundScores
      .map(({ round, score }) => `Round ${round}: ${score}/15`)
      .join('   ');

    this.add.text(400, 428, scoreLines, {
      fontSize: '15px', fill: '#aaaaaa', fontFamily: 'Arial'
    }).setOrigin(0.5);

    this.add.text(400, 456, `Total Math Score: ${GameState.totalScore} / ${maxPossible} ⭐`, {
      fontSize: '20px', fill: '#ffe066',
      fontFamily: 'Arial Black, Arial', stroke: '#000', strokeThickness: 2
    }).setOrigin(0.5);

    // Play again
    const btn = this.add.text(400, 520, '🌊 Play Again', {
      fontSize: '28px', fill: '#ffffff',
      backgroundColor: '#2980b9',
      fontFamily: 'Arial Black, Arial',
      padding: { x: 28, y: 12 }, stroke: '#000', strokeThickness: 3
    }).setOrigin(0.5).setInteractive({ useHandCursor: true });

    btn.on('pointerover', () => btn.setStyle({ backgroundColor: '#3498db' }));
    btn.on('pointerout',  () => btn.setStyle({ backgroundColor: '#2980b9' }));
    btn.on('pointerup',   () => {
      SoundManager.click();
      this.scene.start('Title');
    });

    this.tweens.add({
      targets: btn, y: 528, duration: 900,
      yoyo: true, repeat: -1, ease: 'Sine.easeInOut'
    });
  }
}
