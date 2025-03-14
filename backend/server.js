const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const mongoose = require("mongoose"); // Import mongoose
const cors = require("cors");

// MongoDB Connection URL
const mongoURL = "mongodb+srv://harsh:Harsh%401204@cluster0.b37ez.mongodb.net/?retryWrites=true&w=majority";

// Connect to MongoDB Atlas
mongoose
  .connect(mongoURL)
  .then(() => console.log("MongoDB Connected Successfully"))
  .catch((err) => console.error("MongoDB Connection Failed:", err));

// Define Message Schema for MongoDB
const messageSchema = new mongoose.Schema({
  username: String,
  message: String,
  timestamp: { type: Date, default: Date.now },
});

const Message = mongoose.model("Message", messageSchema);

// Initialize Express and Socket.IO
const app = express();
app.use(cors());
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "http://localhost:5173", methods: ["GET", "POST"] },
});

// Typing Users Management
let typingUsers = {};

// Socket.IO Logic
io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  // Send existing messages when user connects
  Message.find().then((messages) => {
    socket.emit("loadMessages", messages);
  });

  // Handle sending and receiving messages
  socket.on("sendMessage", (data) => {
    const newMessage = new Message({
      username: data.username,
      message: data.message,
    });

    newMessage.save().then(() => {
      io.emit("receiveMessage", data); // Broadcast to all clients
    });
  });

  // Handle typing indicator
  socket.on("typing", (username) => {
    typingUsers[socket.id] = username;
    io.emit("typing", Object.values(typingUsers));
  });

  socket.on("stopTyping", () => {
    delete typingUsers[socket.id];
    io.emit("typing", Object.values(typingUsers));
  });

  // Handle disconnect
  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
    delete typingUsers[socket.id];
    io.emit("typing", Object.values(typingUsers));
  });
});

// Start the server
server.listen(3000, () => {
  console.log("Server running on port 3000");
});

// Admin login check
const adminCredentials = {
    username: "admin", // Hardcoded admin username
    password: "admin123", // Hardcoded admin password
  };
  
  // Add route for admin login
  app.post("/admin/login", (req, res) => {
    const { username, password } = req.body;
  
    if (username === adminCredentials.username && password === adminCredentials.password) {
      return res.status(200).send({ message: "Admin login successful!" });
    }
    return res.status(401).send({ message: "Invalid credentials" });
  });

  io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);
  
    // Existing message loading
    Message.find().then((messages) => {
      socket.emit("loadMessages", messages);
    });
  
    // Handle sending and receiving private messages
    socket.on("sendPrivateMessage", (data) => {
      const { toUserId, fromUser, message } = data;
  
      const newMessage = new Message({
        username: fromUser,
        message: message,
      });
  
      newMessage.save().then(() => {
        io.to(toUserId).emit("receivePrivateMessage", data); // Send to specific user
      });
    });
  
    // Typing indicator for private chats
    socket.on("typing", (data) => {
      socket.to(data.toUserId).emit("typing", { username: data.username });
    });
  
    socket.on("stopTyping", (data) => {
      socket.to(data.toUserId).emit("stopTyping", { username: data.username });
    });
  
    // Handle disconnect
    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });
  