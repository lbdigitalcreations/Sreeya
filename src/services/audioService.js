// Web Audio API Synthesizer for Background Birthday Music & FX

class BirthdayAudioEngine {
  constructor() {
    this.audioCtx = null;
    this.isPlaying = false;
    this.isMuted = false;
    this.currentTempo = 110;
    this.melodyTimer = null;
    this.listeners = new Set();

    // Notes frequency mapping (C4 to C6)
    this.notes = {
      'C4': 261.63, 'D4': 293.66, 'E4': 329.63, 'F4': 349.23,
      'G4': 392.00, 'A4': 440.00, 'B4': 493.88, 'C5': 523.25,
      'D5': 587.33, 'E5': 659.25, 'F5': 698.46, 'G5': 783.99,
      'A5': 880.00, 'Bb4': 466.16, 'Bb5': 932.33
    };

    // Happy Birthday melody notes and durations (in beats)
    this.happyBirthdayMelody = [
      { note: 'G4', duration: 0.75 }, { note: 'G4', duration: 0.25 },
      { note: 'A4', duration: 1.0 }, { note: 'G4', duration: 1.0 },
      { note: 'C5', duration: 1.0 }, { note: 'B4', duration: 2.0 },

      { note: 'G4', duration: 0.75 }, { note: 'G4', duration: 0.25 },
      { note: 'A4', duration: 1.0 }, { note: 'G4', duration: 1.0 },
      { note: 'D5', duration: 1.0 }, { note: 'C5', duration: 2.0 },

      { note: 'G4', duration: 0.75 }, { note: 'G4', duration: 0.25 },
      { note: 'G5', duration: 1.0 }, { note: 'E5', duration: 1.0 },
      { note: 'C5', duration: 1.0 }, { note: 'B4', duration: 1.0 },
      { note: 'A4', duration: 2.0 },

      { note: 'F5', duration: 0.75 }, { note: 'F5', duration: 0.25 },
      { note: 'E5', duration: 1.0 }, { note: 'C5', duration: 1.0 },
      { note: 'D5', duration: 1.0 }, { note: 'C5', duration: 2.5 }
    ];
  }

  initCtx() {
    if (!this.audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.audioCtx = new AudioContext();
    }
    if (this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  toggleMusic() {
    this.initCtx();
    if (this.isPlaying) {
      this.stopMusic();
    } else {
      this.startMusic();
    }
    return this.isPlaying;
  }

  startMusic() {
    this.initCtx();
    if (this.isPlaying) return;
    this.isPlaying = true;
    this.notifyListeners();

    let index = 0;
    const beatDurationMs = (60 / this.currentTempo) * 1000;

    const playNextNote = () => {
      if (!this.isPlaying) return;

      const item = this.happyBirthdayMelody[index];
      this.playKalimbaNote(item.note, item.duration * 0.9);

      // Play soft bass pad accompaniment on root notes
      if (index === 0 || index === 6 || index === 12 || index === 19) {
        this.playSoftPadChord(['C4', 'E4', 'G4']);
      }

      index = (index + 1) % this.happyBirthdayMelody.length;
      this.melodyTimer = setTimeout(playNextNote, item.duration * beatDurationMs);
    };

    playNextNote();
  }

  stopMusic() {
    this.isPlaying = false;
    if (this.melodyTimer) {
      clearTimeout(this.melodyTimer);
      this.melodyTimer = null;
    }
    this.notifyListeners();
  }

  // Soft Kalimba / Music Box tone synthesizer
  playKalimbaNote(noteName, durationSec = 1.0) {
    if (!this.audioCtx || this.isMuted) return;
    const freq = this.notes[noteName];
    if (!freq) return;

    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, this.audioCtx.currentTime);

    // Overtone for warm bell sound
    const osc2 = this.audioCtx.createOscillator();
    const gain2 = this.audioCtx.createGain();
    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(freq * 2, this.audioCtx.currentTime);

    const now = this.audioCtx.currentTime;
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.25, now + 0.03);
    gain.gain.exponentialRampToValueAtTime(0.001, now + durationSec);

    gain2.gain.setValueAtTime(0, now);
    gain2.gain.linearRampToValueAtTime(0.08, now + 0.02);
    gain2.gain.exponentialRampToValueAtTime(0.001, now + durationSec * 0.5);

    osc.connect(gain);
    osc2.connect(gain2);
    gain.connect(this.audioCtx.destination);
    gain2.connect(this.audioCtx.destination);

    osc.start(now);
    osc2.start(now);
    osc.stop(now + durationSec);
    osc2.stop(now + durationSec);
  }

  playSoftPadChord(notesList) {
    if (!this.audioCtx || this.isMuted) return;
    const now = this.audioCtx.currentTime;
    notesList.forEach(noteName => {
      const freq = this.notes[noteName];
      if (!freq) return;
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq / 2, now); // Octave down for pad

      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.05, now + 0.3);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.5);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);
      osc.start(now);
      osc.stop(now + 2.5);
    });
  }

  // Sound FX: Confetti Pop
  playPopFX() {
    this.initCtx();
    if (!this.audioCtx || this.isMuted) return;
    const now = this.audioCtx.currentTime;
    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(400, now);
    osc.frequency.exponentialRampToValueAtTime(900, now + 0.1);

    gain.gain.setValueAtTime(0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);

    osc.connect(gain);
    gain.connect(this.audioCtx.destination);
    osc.start(now);
    osc.stop(now + 0.15);
  }

  // Sound FX: Candle Blow (Wind / Puff sound)
  playBlowFX() {
    this.initCtx();
    if (!this.audioCtx || this.isMuted) return;
    const bufferSize = this.audioCtx.sampleRate * 0.4;
    const buffer = this.audioCtx.createBuffer(1, bufferSize, this.audioCtx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = this.audioCtx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.audioCtx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(800, this.audioCtx.currentTime);
    filter.frequency.exponentialRampToValueAtTime(100, this.audioCtx.currentTime + 0.4);

    const gain = this.audioCtx.createGain();
    gain.gain.setValueAtTime(0.4, this.audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.audioCtx.currentTime + 0.4);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.audioCtx.destination);
    noise.start();
  }

  // Sound FX: Sparkle Magic Chime
  playSparkleFX() {
    this.initCtx();
    if (!this.audioCtx || this.isMuted) return;
    ['C6', 'E6', 'G6', 'C7'].forEach((note, i) => {
      setTimeout(() => {
        const freq = this.notes[note] || 1046.5;
        const now = this.audioCtx.currentTime;
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now);
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
        osc.connect(gain);
        gain.connect(this.audioCtx.destination);
        osc.start(now);
        osc.stop(now + 0.4);
      }, i * 70);
    });
  }

  // Sound FX: Fireworks Boom
  playFireworkFX() {
    this.initCtx();
    if (!this.audioCtx || this.isMuted) return;
    const now = this.audioCtx.currentTime;
    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(180, now);
    osc.frequency.exponentialRampToValueAtTime(40, now + 0.5);

    gain.gain.setValueAtTime(0.5, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);

    osc.connect(gain);
    gain.connect(this.audioCtx.destination);
    osc.start(now);
    osc.stop(now + 0.6);
  }

  // Sound FX: Bow string tension pull
  playBowPullFX() {
    this.initCtx();
    if (!this.audioCtx || this.isMuted) return;
    const now = this.audioCtx.currentTime;
    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(140, now);
    osc.frequency.linearRampToValueAtTime(260, now + 0.18);
    gain.gain.setValueAtTime(0.05, now);
    gain.gain.linearRampToValueAtTime(0.12, now + 0.1);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
    osc.connect(gain);
    gain.connect(this.audioCtx.destination);
    osc.start(now);
    osc.stop(now + 0.22);
  }

  // Sound FX: Arrow release whoosh
  playArrowReleaseFX() {
    this.initCtx();
    if (!this.audioCtx || this.isMuted) return;
    const now = this.audioCtx.currentTime;

    // Bow string twang
    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(320, now);
    osc.frequency.exponentialRampToValueAtTime(90, now + 0.18);
    gain.gain.setValueAtTime(0.25, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);
    osc.connect(gain);
    gain.connect(this.audioCtx.destination);
    osc.start(now);
    osc.stop(now + 0.18);

    // Air whoosh noise
    const bufferSize = this.audioCtx.sampleRate * 0.25;
    const buffer = this.audioCtx.createBuffer(1, bufferSize, this.audioCtx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    const noise = this.audioCtx.createBufferSource();
    noise.buffer = buffer;
    const filter = this.audioCtx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1200, now);
    filter.frequency.exponentialRampToValueAtTime(400, now + 0.25);
    const nGain = this.audioCtx.createGain();
    nGain.gain.setValueAtTime(0.2, now);
    nGain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
    noise.connect(filter);
    filter.connect(nGain);
    nGain.connect(this.audioCtx.destination);
    noise.start(now);
  }

  // Sound FX: Heart hit impact with magical chime & sparkle
  playHeartHitFX() {
    this.initCtx();
    if (!this.audioCtx || this.isMuted) return;
    const now = this.audioCtx.currentTime;

    // Soft heart thud
    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(180, now);
    osc.frequency.exponentialRampToValueAtTime(60, now + 0.2);
    gain.gain.setValueAtTime(0.35, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
    osc.connect(gain);
    gain.connect(this.audioCtx.destination);
    osc.start(now);
    osc.stop(now + 0.25);

    // Magical chime cascade
    ['E5', 'G5', 'B5', 'E6', 'G6'].forEach((n, idx) => {
      setTimeout(() => {
        const freq = this.notes[n] || 880;
        const t = this.audioCtx.currentTime;
        const sOsc = this.audioCtx.createOscillator();
        const sGain = this.audioCtx.createGain();
        sOsc.type = 'sine';
        sOsc.frequency.setValueAtTime(freq, t);
        sGain.gain.setValueAtTime(0.18, t);
        sGain.gain.exponentialRampToValueAtTime(0.001, t + 0.5);
        sOsc.connect(sGain);
        sGain.connect(this.audioCtx.destination);
        sOsc.start(t);
        sOsc.stop(t + 0.5);
      }, idx * 60);
    });
  }

  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  notifyListeners() {
    this.listeners.forEach(fn => fn(this.isPlaying));
  }
}

export const audioEngine = new BirthdayAudioEngine();
