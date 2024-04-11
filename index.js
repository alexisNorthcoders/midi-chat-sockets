const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");
const { instrument } = require("@socket.io/admin-ui");
const path = require("path");

const app = express();
const server = http.createServer(app);

const whitelist = [
  "http://192.168.4.136:3000",
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
app.use("/howler", express.static(path.join(__dirname, "node_modules/howler/dist")));
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
  socket.on("join-room", (room, callback) => {
    socket.join(room);
    callback("Joined " + room);
    console.log(socket.id + " joined room " + room);
  });
  socket.on("send-chat-message", ({message}, room) => {
    const name = userMap.get(socket.id);
    
    if (!room) {
        
        socket.broadcast.emit("chat-message", { name, message });
      
    } else {
      socket.to(room).emit("chat-message", { name, message });
    }
  });
  socket.on("midiMessage", (data) => {
    console.log(data);
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
