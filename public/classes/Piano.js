class Piano {
  constructor(octave = 4) {
    this.context = new AudioContext();
    this.oscillators = {};
    this.isMouseDown = false;
    this.octave = octave;
    this.pianoKeys = document.querySelectorAll(".piano-key");
    this.#setupEventListeners();
    this.keyNoteMap = new Map([
      ["A", "C"],
      ["S", "D"],
      ["D", "E"],
      ["F", "F"],
      ["G", "G"],
      ["H", "A"],
      ["J", "B"],
      ["K", "C+"],
    ]);
    this.pressedKeys = new Set();
    this.sequence=[]

  }

  callOscillator({ on, pitch, velocity }) {
    
    switch (on) {
      case 144:
        noteOn(frequency(pitch), velocity, this.oscillators, this.context);
        break;
      case 128:
        noteOff(frequency(pitch), this.oscillators, this.context);
        break;
    }
}

  #setupEventListeners() {

    //Global mouse events
    document.addEventListener("mousedown", () => {
      this.isMouseDown = true;
    });

    document.addEventListener("mouseup", () => {
      this.isMouseDown = false;
    });
    // Keyboard events
    document.addEventListener('keydown', (event) => {
      const keyPress = event.key.toUpperCase();
      if (!this.pressedKeys.has(keyPress)) {
        this.pressedKeys.add(keyPress);
        this.playByKeyboard(keyPress);
      }
      });
    
    document.addEventListener('keyup', (event) => {
      const keyPress = event.key.toUpperCase();
      if (this.pressedKeys.has(keyPress)) {
        this.pressedKeys.delete(keyPress);
        this.stopByKeyboard(keyPress);
      }
      });
     // Individual Piano key's events
    this.pianoKeys.forEach((key) => {
      key.addEventListener("mousedown", () => {
        this.isMouseDown = true;
        key.classList.add("active");
        const note = key.id;
        const pitch = convertNoteToMIDI(note, this.octave);
        this.callOscillator({ on: 144, pitch, velocity: 127 });
        this.addNote(note)
      });

      key.addEventListener("mouseup", () => {
        this.isMouseDown = false;
        const note = key.id;
        const pitch = convertNoteToMIDI(note, this.octave);
        this.callOscillator({ on: 128, pitch, velocity: 127 });
        key.classList.remove("active");
        key.classList.remove("hover-active");
      });

      key.addEventListener("mouseleave", () => {
        key.classList.remove("active");
        key.classList.remove("hover-active");
        const note = key.id;
        const pitch = convertNoteToMIDI(note, this.octave);
        this.callOscillator({ on: 128, pitch, velocity: 127 });
      });

      key.addEventListener("mouseenter", () => {
        if (this.isMouseDown) {
          key.classList.add("hover-active");
          const note = key.id;
          const pitch = convertNoteToMIDI(note, this.octave);
          this.callOscillator({ on: 144, pitch, velocity: 127 });
        }
      });

      key.addEventListener("touchstart", (event) => {
        event.preventDefault();
        this.isMouseDown = true;
        key.classList.add("active");
        const note = key.id;
        const pitch = convertNoteToMIDI(note, this.octave);
        this.callOscillator({ on: 144, pitch, velocity: 127 });
      });

      key.addEventListener("touchend", () => {
        this.isMouseDown = false;
        const note = key.id;
        const pitch = convertNoteToMIDI(note, this.octave);
        this.callOscillator({ on: 128, pitch, velocity: 127 });
        key.classList.remove("active");
        key.classList.remove("hover-active");
      });

      key.addEventListener("contextmenu", (e) => {
        e.preventDefault();
      });
    });
  }
  play(noteName,velocity=127,octave=this.octave) {
    const key = document.getElementById(noteName);
    if (!key) {
      console.error(`Key with id '${noteName}' not found.`);
      return;
    }
    const pitch = convertNoteToMIDI(noteName, octave);
    this.callOscillator({ on: 144, pitch, velocity });
    key.classList.add("active");
  }
  stop(noteName) {
    const key = document.getElementById(noteName);
    if (!key) {
      console.error(`Key with id '${noteName}' not found.`);
      return;
    }
    const pitch = convertNoteToMIDI(noteName, this.octave);
    this.callOscillator({ on: 128, pitch});
    key.classList.remove("active");
    }
  playChord(chord,noteDurations){
    for (let i=0; i<chord.length;i++){
      const noteName = chord[i]
      this.play(noteName,80)
    }
    for (let i=0; i<chord.length;i++){
      const noteName = chord[i]
      setTimeout(() => {
        this.stop(noteName);
      }, 800);
    }
   
   
  }
  playByKeyboard(keyPress) {
    const noteName = this.keyNoteMap.get(keyPress);
    if (!noteName) {
      return;
    }
    this.play(noteName);
  }
  stopByKeyboard(keyPress) {
    const noteName = this.keyNoteMap.get(keyPress);
    if (!noteName) {
      return;
    }
    this.stop(noteName);
  }
  playMelody(musicsheet,tempo=160, interNoteDuration = 'eighth') {
    const noteDurations = {
      whole: 4,
      half: 2,
      quarter: 1,
      eighth: 0.5,
      sixteenth: 0.25
    };
  
    const millisecondsPerBeat = 60000 / tempo;
    const interNoteDurationMilliseconds = millisecondsPerBeat * noteDurations[interNoteDuration];
    let index = 0;
  
    const playNote = (noteName, duration) => {
      this.play(noteName);
      setTimeout(() => {
        this.stop(noteName);
      }, duration * millisecondsPerBeat);
    };
  
    const playNextNote = () => {
      const { note, duration } = musicsheet[index];
      if (note) {
        playNote(note, noteDurations[duration]);
        index++;
        setTimeout(playNextNote, noteDurations[duration] * millisecondsPerBeat + interNoteDurationMilliseconds);
      }
    };
  
    playNextNote();
  }
  addNote(note){
    this.sequence.push(note)
  }

}
