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
  console.log("Client connected");

  socket.on("join", (userId) => {
    console.log("User joined:", userId);
    users.set(socket.id, userId);
  });

  socket.on("message", (message) => {
    console.log("Received message:", message);

    const senderUserId = users.get(socket.id);

    // Broadcast the message to the user's channel
    io.to(socket.id).emit("message", {
      sender: senderUserId,
      text: message,
    });
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
    users.delete(socket.id);
  });
});

server.listen(8080, () => {
  console.log("WebSocket server started on port 8080");
});
