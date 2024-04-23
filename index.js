const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");
const { instrument } = require("@socket.io/admin-ui");
const path = require("path");
const dotenv = require('dotenv').config()
const app = express();
const server = http.createServer(app);
const {OpenAI} = require('openai')
const openai = new OpenAI({apiKey: process.env.OPENAI_API_KEY})

async function sendSequence(data,name) {
  const completion = await openai.chat.completions.create({
    messages: [{"role": "system", "content": "You are a music teacher for a child. I will send a expected sequence of notes and the child's sequences of notes. Your job is to evaluate if he made a good job or not. You are speaking directly to the child and explain where to improve."},
        {"role": "user", "content": `This is the expected sequence: ${data.melody}. Child sequence:${data.sequence}. Child name:${name} `},
       ],
    model: "gpt-3.5-turbo",
  });
 
 return completion.choices[0].message.content
}


const whitelist = [
  "http://192.168.4.144:3000",
  "http://127.0.0.1:3000",
  "http://localhost:3000",
  "https://admin.socket.io",
];
const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST"],
  credentials: true,
};
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));

const userMap = new Map();
const io = socketIo(server, {
  cors: corsOptions,
});

io.on("connection", (socket) => {
  console.log("New client connected. Id: " + socket.id);

  socket.on("new-user", (name) => {
    for (const [key, value] of userMap.entries()) {
        if (value === name) {
            userMap.delete(key);
        }
    }
   
    userMap.set(socket.id, name);
    console.log(`User ${name} with ID ${socket.id} connected.`);
  });

  socket.on("send-sequence", async (data) => {
    console.log(data)
    const name = userMap.get(socket.id);
    console.log(name)
    const message = await sendSequence(data,name)
    socket.emit("chat-message",{name:"AI",message})
    
  });
  socket.on("midiMessage", (data) => {
    
    socket.broadcast.emit("midiMessage", data);
  });
  socket.on("disconnect", () => {
    userMap.delete(socket.id);
    console.log(`User with ID ${socket.id} disconnected.`);
 
  });
});

instrument(io, { auth: false });

server.listen(3000, () => {
  console.log("Express and Socket.io server listening on port 3000");
});
