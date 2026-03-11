const ANIMALS = [
  { frame: 0,  name: 'Shark'          },
  { frame: 1,  name: 'Lanternfish'    },
  { frame: 2,  name: 'Dolphin'        },
  { frame: 3,  name: 'Whale'          },
  { frame: 4,  name: 'Orca'           },
  { frame: 5,  name: 'Humpback Whale' },
  { frame: 6,  name: 'Manta Ray'      },
  { frame: 7,  name: 'Seal'           },
  { frame: 8,  name: 'Hammerhead'     },
  { frame: 9,  name: 'Squid'          },
  { frame: 10, name: 'Pufferfish'     },
  { frame: 11, name: 'Sailfish'       },
  { frame: 12, name: 'Clownfish'      },
  { frame: 13, name: 'Seahorse'       },
  { frame: 14, name: 'Narwhal'        },
  { frame: 15, name: 'Eel'            },
  { frame: 16, name: 'Salmon'         },
  { frame: 17, name: 'Piranha'        },
  { frame: 18, name: 'Goldfish'       },
  { frame: 19, name: 'Crab'           },
];

class AnimalSelectScene extends Phaser.Scene {
  constructor() { super('AnimalSelect'); }

  create() {
    drawOceanBg(this);

    this.add.text(400, 30, 'Choose Your Ocean Hero!', {
      fontSize: '30px', fill: '#ffffff',
      fontFamily: 'Arial Black, Arial',
      stroke: '#0a3d62', strokeThickness: 5
    }).setOrigin(0.5);

    this.add.text(400, 68, 'Tap an animal to pick it, then press GO!', {
      fontSize: '16px', fill: '#ffe066', fontFamily: 'Arial'
    }).setOrigin(0.5);

    this.selected = GameState.selectedAnimal;
    this.cards    = [];

    const cols = 5, cardW = 110, cardH = 100;
    const startX = (800 - cols * cardW) / 2 + cardW / 2;
    const startY = 105;

    ANIMALS.forEach((animal, i) => {
      const col = i % cols;
      const row = Math.floor(i / cols);
      const x   = startX + col * cardW;
      const y   = startY + row * cardH;

      const bg = this.add.rectangle(x, y, cardW - 8, cardH - 8, 0x1a6fa8, 0.7)
        .setStrokeStyle(2, 0x00d2ff)
        .setInteractive({ useHandCursor: true });

      const spr   = this.add.image(x, y - 12, 'animals', animal.frame).setScale(2.5);
      const label = this.add.text(x, y + 32, animal.name, {
        fontSize: '11px', fill: '#ffffff', fontFamily: 'Arial'
      }).setOrigin(0.5);

      this.cards.push({ bg, spr, label, index: i });

      bg.on('pointerover', () => {
        if (this.selected !== i) bg.setFillStyle(0x2980b9);
      });
      bg.on('pointerout', () => {
        if (this.selected !== i) bg.setFillStyle(0x1a6fa8);
      });
      bg.on('pointerup', () => {
        SoundManager.click();
        this.selectAnimal(i);
      });
    });

    // GO button
    this.goBtn = this.add.text(400, 525, '🌊  GO BATTLE!', {
      fontSize: '28px', fill: '#ffffff',
      backgroundColor: '#27ae60',
      fontFamily: 'Arial Black, Arial',
      padding: { x: 28, y: 12 },
      stroke: '#000', strokeThickness: 3
    }).setOrigin(0.5).setInteractive({ useHandCursor: true });

    this.goBtn.on('pointerover', () => this.goBtn.setStyle({ backgroundColor: '#2ecc71' }));
    this.goBtn.on('pointerout',  () => this.goBtn.setStyle({ backgroundColor: '#27ae60' }));
    this.goBtn.on('pointerup', () => {
      SoundManager.click();
      GameState.selectedAnimal     = this.selected;
      GameState.selectedAnimalName = ANIMALS[this.selected].name;
      this.scene.start('MathQuiz');
    });

    this.tweens.add({
      targets: this.goBtn, y: 532, duration: 800,
      yoyo: true, repeat: -1, ease: 'Sine.easeInOut'
    });

    this.highlightSelected();

    this.selectedLabel = this.add.text(400, 558, `Selected: ${ANIMALS[this.selected].name}`, {
      fontSize: '15px', fill: '#ffe066', fontFamily: 'Arial'
    }).setOrigin(0.5);
  }

  selectAnimal(index) {
    this.selected = index;
    this.highlightSelected();
    this.selectedLabel.setText(`Selected: ${ANIMALS[index].name}`);
  }

  highlightSelected() {
    this.cards.forEach((card, i) => {
      if (i === this.selected) {
        card.bg.setFillStyle(0xe84118);
        card.bg.setStrokeStyle(3, 0xffe066);
        card.spr.setScale(3);
      } else {
        card.bg.setFillStyle(0x1a6fa8);
        card.bg.setStrokeStyle(2, 0x00d2ff);
        card.spr.setScale(2.5);
      }
    });
  }
}
