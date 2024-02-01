const express = require("express");
const http = require("http");
const path = require("path");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

//Socket.io
io.on("connection", (socket) => {
  //   console.log("A new useer has connnected", socket.id);
  socket.on("user-message", (message) => {
    console.log("new user message is ", message);
    io.emit("server-message", message);
  });
});

app.use(express.static(path.resolve("./public")));

app.get("/", (req, res) => {
  return res.sendFile("/public/index.html");
});

server.listen(9000, () => console.log(`Server listning at 9000`));
