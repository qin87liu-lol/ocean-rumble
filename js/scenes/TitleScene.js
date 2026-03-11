class TitleScene extends Phaser.Scene {
  constructor() { super('Title'); }

  create() {
    GameState.reset();
    drawOceanBg(this);

    // Title
    this.add.text(400, 130, '🌊 Ocean Rumble 🌊', {
      fontSize: '48px', fill: '#ffffff',
      fontFamily: 'Arial Black, Arial',
      stroke: '#0a3d62', strokeThickness: 6,
      shadow: { color: '#000', blur: 8, fill: true }
    }).setOrigin(0.5);

    this.add.text(400, 200, 'Math + Sea Battles!', {
      fontSize: '24px', fill: '#ffe066',
      fontFamily: 'Arial', stroke: '#000', strokeThickness: 3
    }).setOrigin(0.5);

    // Animated animal preview — swim across
    this.previewAnimals = [];
    [0, 4, 10, 12, 13].forEach((f, i) => {
      const x   = 80 + i * 150;
      const spr = this.add.image(x, 350, 'animals', f)
        .setScale(3).setFlipX(i % 2 === 0);
      this.previewAnimals.push({ spr, speed: 0.5 + Math.random() * 0.4 });
    });

    // Start button
    const btn = this.add.text(400, 468, '▶  START GAME', {
      fontSize: '32px', fill: '#ffffff',
      backgroundColor: '#e84118',
      fontFamily: 'Arial Black, Arial',
      padding: { x: 30, y: 14 },
      stroke: '#000', strokeThickness: 3
    }).setOrigin(0.5).setInteractive({ useHandCursor: true });

    const startGame = () => {
      SoundManager.click();
      this.scene.start('AnimalSelect');
    };

    btn.on('pointerover', () => btn.setStyle({ backgroundColor: '#ff6b35' }));
    btn.on('pointerout',  () => btn.setStyle({ backgroundColor: '#e84118' }));
    btn.on('pointerup',   startGame);

    this.input.keyboard.on('keydown-ENTER', startGame);
    this.input.keyboard.on('keydown-SPACE', startGame);

    this.tweens.add({
      targets: btn, y: 476, duration: 900,
      yoyo: true, repeat: -1, ease: 'Sine.easeInOut'
    });

    this.add.text(400, 548, '❤️  ❤️  ❤️   3 Lives to Win Ocean Rumble!', {
      fontSize: '16px', fill: '#ffe066', fontFamily: 'Arial'
    }).setOrigin(0.5);
  }

  update() {
    this.previewAnimals.forEach(({ spr, speed }) => {
      spr.x += speed;
      if (spr.x > 880) spr.x = -40;
    });
  }
}
