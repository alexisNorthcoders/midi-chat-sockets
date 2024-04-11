import { io } from "https://cdn.socket.io/4.7.5/socket.io.esm.min.js";

const socket = io("http://192.168.4.29:3000");
//Oscilator 

const context = new AudioContext();
const oscillators = {};
let midi, data;

function frequency(note) {
  return Math.pow(2, ((note - 69) / 12)) * 440;
}
function playNote(data){
  console.log('play note: ', data.pitch);
  switch(data.on) {
    case 144:
      noteOn(frequency(data.pitch), data.velocity);
      break;
    case 128:
      noteOff(frequency(data.pitch), data.velocity);
      break;
  }

  function noteOn(frequency, velocity) {
    const vol = (velocity / 127).toFixed(2);

    const osc = oscillators[frequency] = context.createOscillator();
        osc.type = 'sawtooth';
        osc.frequency.value = frequency;
        osc.setVolume = vol;
        osc.connect(context.destination);
        osc.start(context.currentTime);
  }

  function noteOff(frequency, velocity) {
      oscillators[frequency].stop(context.currentTime);
      oscillators[frequency].disconnect();
  }
}

// DOM elements
const messageContainer = document.getElementById("message-container");
const messageForm = document.getElementById("form");
const messageInput = document.getElementById("message-input");
const joinRoomButton = document.getElementById("room-button");
const roomInput = document.getElementById("room-input");

// Chat sockets

socket.on("connect", () => {
  let name = "";
  if (localStorage.getItem("chat-username")) {
    name = localStorage.getItem("chat-username");
  } else {
    name = prompt("What is your name?");
    localStorage.setItem("chat-username", name);
  }

  /*  const names = ["jonny", "ernesto", "mary", "jane", "lulu"];
  const name = names[Math.floor(Math.random() * 5)]; */
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
socket.on("midiMessage", (data) => {
  visualizeKey(data.note, data.velocity);
});

// Audio


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

function appendMessage(message) {
  const messageElement = document.createElement("div");
  messageElement.innerText = message;
  messageContainer.append(messageElement);
}

function generateKeyboard() {
  const keyboard = document.getElementById("keyboard");
  for (let i = 1; i <= 96; i++) {
    const key = document.createElement("div");
    key.classList.add("key");
    key.dataset.note = i;
    keyboard.appendChild(key);
  }
}

function onMIDISuccess(midiAccess) {
  
  midiAccess.inputs.forEach((input) => {
    input.onmidimessage = onMIDIMessage;
  });
}


function onMIDIFailure(msg) {
  console.error(`Failed to get MIDI access - ${msg}`);
}

function onMIDIMessage(message) {
  const [command, note, velocity] = message.data;
  socket.emit("midiMessage", { command, note, velocity });
  visualizeKey(note, velocity);
  
const noteToPlay = {
  on: command, 
  pitch: note,
  velocity: velocity
}
playNote(noteToPlay);
}

function visualizeKey(note, velocity) {
  const keyElement = document.querySelector(`.key[data-note='${note}']`);
  if (velocity > 0) {
    keyElement.classList.add("active");
  } else {
    keyElement.classList.remove("active");
  }
}

if (navigator.requestMIDIAccess) {
  navigator.requestMIDIAccess().then(onMIDISuccess, onMIDIFailure);
} else {
  console.log("Web MIDI API not supported!");
}

generateKeyboard();
