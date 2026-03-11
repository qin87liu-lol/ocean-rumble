// Synthesized sound effects via Web Audio API — no audio files needed.
const SoundManager = {
  _ctx: null,

  get ctx() {
    if (!this._ctx) {
      this._ctx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (this._ctx.state === 'suspended') this._ctx.resume();
    return this._ctx;
  },

  _tone(freq, startSec, duration, gainVal = 0.28, type = 'sine') {
    try {
      const ctx = this.ctx;
      const osc = ctx.createOscillator();
      const g   = ctx.createGain();
      osc.connect(g);
      g.connect(ctx.destination);
      osc.type = type;
      osc.frequency.value = freq;
      const t = ctx.currentTime + startSec;
      g.gain.setValueAtTime(0, t);
      g.gain.linearRampToValueAtTime(gainVal, t + 0.01);
      g.gain.exponentialRampToValueAtTime(0.0001, t + duration);
      osc.start(t);
      osc.stop(t + duration + 0.05);
    } catch (e) { /* ignore — audio blocked or unavailable */ }
  },

  click()  { this._tone(700, 0, 0.06, 0.18); },

  correct() {
    this._tone(523, 0,    0.12);
    this._tone(659, 0.11, 0.12);
    this._tone(784, 0.22, 0.25);
  },

  wrong() {
    this._tone(330, 0,    0.18, 0.25, 'sawtooth');
    this._tone(220, 0.16, 0.28, 0.2,  'sawtooth');
  },

  shoot() { this._tone(880, 0, 0.07, 0.14, 'square'); },

  hit() {
    this._tone(180, 0,    0.12, 0.4, 'sawtooth');
    this._tone(100, 0.09, 0.18, 0.3, 'sawtooth');
  },

  powerup() {
    [262, 330, 392, 523, 659].forEach((f, i) =>
      this._tone(f, i * 0.1, i === 4 ? 0.3 : 0.14));
  },

  victory() {
    [523, 659, 784, 1047].forEach((f, i) =>
      this._tone(f, i * 0.16, i === 3 ? 0.5 : 0.18, 0.35));
  },

  countdown() { this._tone(600, 0, 0.09, 0.22); },
  fight()     {
    this._tone(784,  0,    0.14, 0.4);
    this._tone(1047, 0.13, 0.32, 0.4);
  },
};
