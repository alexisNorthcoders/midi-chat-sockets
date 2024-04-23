import { io } from "https://cdn.socket.io/4.7.5/socket.io.esm.min.js";

const socket = io("wss://midi-chat-sockets-1.onrender.com/socket.io");

// Initialize piano
const piano = new Piano();

// DOM elements
const messageContainer = document.getElementById("message-container");
const mcdonaldButton = document.getElementById("mcdonald");
const twinkleButton = document.getElementById("twinkle");
const cChordButton = document.getElementById("C-Chord");
const startButton = document.getElementById("start");

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
  piano.playMelody(wheelsbus, 160);
});
cChordButton.addEventListener("click", () => {
  piano.playChord(["C", "E", "G"]);
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

startButton.addEventListener("click", () => {
  console.log("sending sequence");
  startTimer();
});

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
