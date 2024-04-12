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
  }

  playNote({ on, pitch, velocity = 127 }) {
    console.log(on,pitch,velocity,"inside piano Class")
    switch (on) {
      case 144:
        noteOn(frequency(pitch), velocity, this.oscillators, this.context);
        break;
      case 128:
        console.log("stopping note")
        noteOff(frequency(pitch), this.oscillators, this.context);
        break;
    }

    function noteOn(frequency, velocity, oscillators, context) {
      const vol = (velocity / 127).toFixed(2);

      const osc = (oscillators[frequency] = context.createOscillator());
      osc.type = "sawtooth";
      osc.frequency.value = frequency;
      osc.setVolume = vol;
      osc.connect(context.destination);
      osc.start(context.currentTime);
    }

    function noteOff(frequency, oscillators, context) {
      if (oscillators[frequency]) {
        oscillators[frequency].stop(context.currentTime);
        oscillators[frequency].disconnect();
        delete oscillators[frequency];
      }
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
      this.playByKeyboard(event.key.toUpperCase())
       
     });
     document.addEventListener('keyup', (event) => {
       this.stopByKeyboard(event.key.toUpperCase())
       
     });
     // Individual Piano key's events
    this.pianoKeys.forEach((key) => {
      key.addEventListener("mousedown", () => {
        this.isMouseDown = true;
        key.classList.add("active");
        const note = key.id;
        const pitch = convertNoteToMIDI(note, this.octave);
        this.playNote({ on: 144, pitch, velocity: 127 });
      });

      key.addEventListener("mouseup", () => {
        this.isMouseDown = false;
        const note = key.id;
        const pitch = convertNoteToMIDI(note, this.octave);
        this.playNote({ on: 128, pitch, velocity: 127 });
        key.classList.remove("active");
        key.classList.remove("hover-active");
      });

      key.addEventListener("mouseleave", () => {
        key.classList.remove("active");
        key.classList.remove("hover-active");
        const note = key.id;
        const pitch = convertNoteToMIDI(note, this.octave);
        this.playNote({ on: 128, pitch, velocity: 127 });
      });

      key.addEventListener("mouseenter", () => {
        if (this.isMouseDown) {
          key.classList.add("hover-active");
          const note = key.id;
          const pitch = convertNoteToMIDI(note, this.octave);
          this.playNote({ on: 144, pitch, velocity: 127 });
        }
      });

      key.addEventListener("touchstart", (event) => {
        event.preventDefault();
        this.isMouseDown = true;
        key.classList.add("active");
        const note = key.id;
        const pitch = convertNoteToMIDI(note, this.octave);
        this.playNote({ on: 144, pitch, velocity: 127 });
      });

      key.addEventListener("touchend", () => {
        this.isMouseDown = false;
        const note = key.id;
        const pitch = convertNoteToMIDI(note, this.octave);
        this.playNote({ on: 128, pitch, velocity: 127 });
        key.classList.remove("active");
        key.classList.remove("hover-active");
      });

      key.addEventListener("contextmenu", (e) => {
        e.preventDefault();
      });
    });
  }
  play(noteName) {
    const key = document.getElementById(noteName);
    if (!key) {
      console.error(`Key with id '${noteName}' not found.`);
      return;
    }
    const pitch = convertNoteToMIDI(noteName, this.octave);
    this.playNote({ on: 144, pitch, velocity: 127 });
    key.classList.add("active");
  }
  stop(noteName) {
    const key = document.getElementById(noteName);
    if (!key) {
      console.error(`Key with id '${noteName}' not found.`);
      return;
    }
    const pitch = convertNoteToMIDI(noteName, this.octave);
    this.playNote({ on: 128, pitch});
    key.classList.remove("active");
    console.log("key stopped");
  }
  playByKeyboard(keyPress) {
    const noteName = this.keyNoteMap.get(keyPress);
    if (!noteName) {
      console.error(`No note mapped to key '${keyPress}'.`);
      return;
    }
    this.play(noteName);
  }
  stopByKeyboard(keyPress) {
    const noteName = this.keyNoteMap.get(keyPress);
    if (!noteName) {
      console.error(`No note mapped to key '${keyPress}'.`);
      return;
    }
    this.stop(noteName);
  }
}
