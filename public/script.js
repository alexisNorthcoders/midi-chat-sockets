import { io } from "https://cdn.socket.io/4.7.5/socket.io.esm.min.js";

const socket = io("midi-chat-sockets-1.onrender.com", {transports:["websocket"]});

// Initialize piano
const piano = new Piano();

// DOM elements
const messageContainer = document.getElementById("message-container");
const mcdonaldButton = document.getElementById("mcdonald");
const twinkleButton = document.getElementById("twinkle");
const cChordButton = document.getElementById("C-Chord");
const cMinorChordButton = document.getElementById("CMinor-Chord");
const dChordButton = document.getElementById("D-Chord");
const wheelsButton = document.getElementById("wheels");
const marylambButton = document.getElementById("marylamb");
const chopsticksButton = document.getElementById("chopsticks");
const jingleBellsButton = document.getElementById("jingleBells");
const cradleSongButton = document.getElementById("cradleSong");
const itsyBitsySpiderButton = document.getElementById("itsyBitsySpider");
const ringAroundTheRosesButton = document.getElementById("ringAroundTheRoses");

const increaseButton = document.getElementById("increaseOctave");
const decreaseButton = document.getElementById("decreaseOctave");
const typeButton = document.getElementById("type");

// Chat sockets

socket.on("connect", () => {
  let name = "";
  if (localStorage.getItem("chat-username")) {
    name = localStorage.getItem("chat-username");
  } else {
    name = prompt("What is your name?");
    localStorage.setItem("chat-username", name);
  }

  appendMessage("You joined as " + name);
  socket.emit("new-user", name);
});

socket.on("chat-message", (data) => {
  appendMessage(`${data.name}: ${data.message}`);
});

socket.on("user-connected", (name) => {
  appendMessage(`${name} connected`);
});

socket.on("user-disconnected", (name) => {
  appendMessage(`${name} disconnected`);
});

// Event Listeners

mcdonaldButton.addEventListener("click", () => {
  piano.playMelody(oldMacDonald, 160);
});
twinkleButton.addEventListener("click", () => {
  piano.playMelody(twinkletwinkle, 160);
});
cChordButton.addEventListener("click", () => {
  piano.playChord(["C", "E", "G"]);
});
cMinorChordButton.addEventListener("click", () => {
  piano.playChord(["C", "D#", "G"]);
});
dChordButton.addEventListener("click", () => {
  piano.playChord(["D", "F#", "A"]);
});
wheelsButton.addEventListener("click", () => {
  piano.playMelody(wheelsbus, 160);
});
marylambButton.addEventListener("click", () => {
  piano.playMelody(maryHadALittleLamb, 160);
});
chopsticksButton.addEventListener("click", () => {
  piano.playMelody(chopsticks, 160);
});
jingleBellsButton.addEventListener("click", () => {
  piano.playMelody(jingleBells, 160);
});
itsyBitsySpiderButton.addEventListener("click", () => {
  piano.playMelody(itsyBitsySpider, 160);
});
ringAroundTheRosesButton.addEventListener("click", () => {
  piano.playMelody(ringAroundTheRoses, 160);
});
cradleSongButton.addEventListener("click", () => {
  piano.playMelody(cradleSong, 160);
});

increaseButton.addEventListener("click", () => {
  piano.increaseOctave();
});
decreaseButton.addEventListener("click", () => {
  piano.decreaseOctave();
});
typeButton.addEventListener("click", () => {
  piano.nextOscillatorType();
});
// Notes Sequences

function startTimer() {
  piano.sequence = [];
  const oldMacDonaldNotes = oldMacDonald.map((element)=> element.note)
  appendMessage("Start playing...");

  setTimeout(() => {
    socket.emit("send-sequence", {sequence:piano.sequence, melody:oldMacDonaldNotes},);
    appendMessage("Sending...");
    piano.sequence = [];
  }, 5000);
}


// Chat functions
function appendMessage(message) {
  const messageElement = document.createElement("div");
  messageElement.innerText = message;
  messageContainer.append(messageElement);
}

// MIDI functions
function onMIDISuccess(midiAccess) {
  midiAccess.inputs.forEach((input) => {
    input.onmidimessage = onMIDIMessage;
  });
}

function onMIDIFailure(msg) {
  console.error(`Failed to get MIDI access - ${msg}`);
}

function onMIDIMessage(message) {
  const [on, pitch, velocity] = message.data;
  console.log(velocity);
  let { note, octave } = pitchToNoteName(pitch, piano.octave);
  if (note === "C" && octave === piano.octave + 1) {
    note = "C+";
  }
  socket.emit("midiMessage", { on, pitch, velocity });
  if (octave === piano.octave || note === "C+") {
    if (on === 144) {
      piano.play(note, velocity);
    } else if (on === 128) {
      piano.stop(note);
    }
  } else {
    piano.callOscillator({ on, pitch, velocity });
  }
}
console.log(navigator.requestMIDIAccess);
if (navigator.requestMIDIAccess) {
  navigator.requestMIDIAccess().then(onMIDISuccess, onMIDIFailure);
} else {
  console.log("Web MIDI API not supported!");
}