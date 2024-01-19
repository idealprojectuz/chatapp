import express from "express";
import "dotenv/config";
import { Server } from "socket.io";
import { createServer } from "node:http";

const app = express();
const PORT = process.env.PORT || 8000;
const server = createServer(app);
const io = new Server(server);
app.get("/", (req, res) => {
  res.send("<h1>Hello world</h1>");
});

io.on("connection", (socket) => {
  console.log("a user connected");
  console.log(socket);
});

server.listen(PORT, () => console.log("server listening on port " + PORT));
