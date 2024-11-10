function frequency(note) {
  return Math.pow(2, (note - 69) / 12) * 440;
}
function convertNoteToMIDI(note, octaveInput) {
  const noteMap = {
    C: 0,
    "C#": 1,
    Db: 1,
    D: 2,
    "D#": 3,
    Eb: 3,
    E: 4,
    F: 5,
    "F#": 6,
    Gb: 6,
    G: 7,
    "G#": 8,
    Ab: 8,
    A: 9,
    "A#": 10,
    Bb: 10,
    B: 11,
  };

  octave = note.includes("+") ? octaveInput + 1 : octaveInput;
  const noteIndex = noteMap[note.replace("+", "")];
  if (!isNaN(octave) && noteIndex !== undefined) {
    return octave * 12 + noteIndex + 12;
  }
  return NaN;
}

function pitchToNoteName(pitch, baseOctave) {
  const noteNames = [
    "C",
    "C#",
    "D",
    "D#",
    "E",
    "F",
    "F#",
    "G",
    "G#",
    "A",
    "A#",
    "B",
  ];
  const index = pitch % 12;
  let noteName = noteNames[index];
  let octave = baseOctave + Math.floor((pitch - 60) / 12);
  return {
    note: noteName,
    octave: octave,
  };
}

// Oscillator functions

function noteOn(frequency, velocity, oscillators, context, type) {
  const gain = context.createGain(); 
  const vol = (velocity / 127).toFixed(2);

 
  gain.gain.value = vol;

  const osc = context.createOscillator();
  osc.type = type;
  osc.frequency.value = frequency;
  osc.connect(gain);
  gain.connect(context.destination);
  osc.start(context.currentTime);
  oscillators[frequency] = osc
}

function noteOff(frequency, oscillators, context) {
  if (oscillators[frequency]) {
    oscillators[frequency].stop(context.currentTime);
    oscillators[frequency].disconnect();
    delete oscillators[frequency];
  }
}