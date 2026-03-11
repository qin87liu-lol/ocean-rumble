class BootScene extends Phaser.Scene {
  constructor() { super('Boot'); }

  preload() {
    // Loading bar background
    const bar = this.add.graphics();
    bar.fillStyle(0x0a3d62, 1);
    bar.fillRect(200, 270, 400, 30);

    const fill = this.add.graphics();
    this.load.on('progress', (v) => {
      fill.clear();
      fill.fillStyle(0x00d2ff, 1);
      fill.fillRect(202, 272, 396 * v, 26);
    });

    this.add.text(400, 240, 'Loading Ocean Rumble...', {
      fontSize: '22px', fill: '#ffffff', fontFamily: 'Arial'
    }).setOrigin(0.5);

    this.load.spritesheet('animals',
      'MarineAnimals/PixelCreatures.png.PNG',
      { frameWidth: 32, frameHeight: 32 }
    );
  }

  create() {
    this.scene.start('Title');
  }
}
