const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
const cors = require("cors");

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173/chat", // Replace with the actual origin of your frontend app
    credentials: true, // Enable sending cookies and other credentials
  })
);

const server = http.createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

const users = new Map();

app.use(cors());

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  socket.on("join", (groupId) => {
    console.log("User joined:", userId);
    users.set(socket.id, userId);
  });

  socket.on("message", (message) => {
    console.log("Received message:", message);

    const groupId = users.get(socket.id);

    // Broadcast the message to the user's channel
    io.to(groupId).emit("message", {
      sender: socket.id,
      text: message,
    });
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected:", socket.id);
    // Remove the user from the user's channel (room)
    const groupId = users.get(socket.id);
    socket.leave(groupId);
    users.delete(socket.id);
  });
});

server.listen(8080, () => {
  console.log("WebSocket server started on port 8080");
});
