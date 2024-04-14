import { io } from "https://cdn.socket.io/4.7.5/socket.io.esm.min.js";

const socket = io("http://192.168.4.29:3000");

// Initialize piano
const piano = new Piano();

// DOM elements
const messageContainer = document.getElementById("message-container");
const messageForm = document.getElementById("form");
const messageInput = document.getElementById("message-input");
const joinRoomButton = document.getElementById("room-button");
const roomInput = document.getElementById("room-input");
const mcdonaldButton = document.getElementById("mcdonald");
const twinkleButton = document.getElementById("twinkle");
const cChordButton = document.getElementById("C-Chord");

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

// MIDI sockets
socket.on("midiMessage", ({ on, pitch, velocity }) => {
  piano.playNote({ on, pitch, velocity });
});

// Event Listeners

messageForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const message = messageInput.value;
  const room = roomInput.value || null;

  if (message === "") return;
  appendMessage(`You: ${message}`);
  socket.emit("send-chat-message", { message }, room);
  messageInput.value = "";
});
joinRoomButton.addEventListener("click", () => {
  const room = roomInput.value;
  socket.emit("join-room", room, (message) => {
    appendMessage(message);
  });
});

mcdonaldButton.addEventListener("click",()=>{
  piano.playMelody(oldMacDonald,240)
})
twinkleButton.addEventListener("click",()=>{
 piano.playMelody(twinkletwinkle,120)
 
})
cChordButton.addEventListener("click",()=>{
  piano.playChord(["C","E","G"])
})
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
  console.log(velocity)
  let { note, octave } = pitchToNoteName(pitch, piano.octave);
  if (note === "C" && octave === piano.octave +1){
    note = "C+"
  }
  socket.emit("midiMessage", { on, pitch, velocity });
  if (octave === piano.octave || note === "C+"){
    if (on === 144) {
      piano.play(note,velocity);
    } else if (on === 128) {
      piano.stop(note);
    }
  }
  else {
    piano.playNote({on,pitch,velocity})
  }
  
}
if (navigator.requestMIDIAccess) {
  navigator.requestMIDIAccess().then(onMIDISuccess, onMIDIFailure);
} else {
  console.log("Web MIDI API not supported!");
}
