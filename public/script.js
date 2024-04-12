import { io } from "https://cdn.socket.io/4.7.5/socket.io.esm.min.js";

const socket = io("http://192.168.4.29:3000");


const piano = new Piano()
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

// Piano



// Event Listeners
document.addEventListener('keydown', (event) => {
  const key = event.key.toUpperCase(); // Convert the pressed key to uppercase
  const keyIndex = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K'].indexOf(key); // Map the pressed key to an index (0-7)
  if (keyIndex !== -1) {
    const noteIndex = keyIndex + 3; // Offset the index to match notes C to C+
    const note = String.fromCharCode(67 + noteIndex); // Convert the index back to a note (C to C+)
    const pitch = convertNoteToMIDI(note);
    playNote({ on: 144, pitch, velocity: 127 });
    // Add 'active' class to the corresponding key
    pianoKeys[noteIndex].classList.add('active');
  }
});

document.addEventListener('keyup', (event) => {
  const key = event.key.toUpperCase(); // Convert the released key to uppercase
  const keyIndex = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K'].indexOf(key); // Map the released key to an index (0-7)
  if (keyIndex !== -1) {
    const noteIndex = keyIndex + 3; // Offset the index to match notes C to C+
    const note = String.fromCharCode(67 + noteIndex); // Convert the index back to a note (C to C+)
    const pitch = convertNoteToMIDI(note);
    playNote({ on: 128, pitch, velocity: 127 });
    // Remove 'active' class from the corresponding key
    pianoKeys[noteIndex].classList.remove('active');
  }
});




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
  const [command, note, velocity] = message.data;
  socket.emit("midiMessage", { command, note, velocity });
  visualizeKey(note, velocity);

  const noteToPlay = {
    on: command,
    pitch: note,
    velocity: velocity,
  };
  playNote(noteToPlay);
}



if (navigator.requestMIDIAccess) {
  navigator.requestMIDIAccess().then(onMIDISuccess, onMIDIFailure);
} else {
  console.log("Web MIDI API not supported!");
}

