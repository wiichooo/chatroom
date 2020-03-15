var express = require("express");
var app = express();
var server = require("http").createServer(app);
var io = require("socket.io").listen(server);
const request = require("request");
const csv = require("csvtojson");
connectedUsers = [];

server.listen(4000);
console.log("Server started.");
io.sockets.on("connection", clientConnected);

function clientConnected(socket) {
  // New connected user
  socket.username = "";
  console.log("Client  " + socket.handshake.address + "  connected.");
  // Client disconnected
  socket.on("disconnect", function() {
    console.log("Client  " + socket.handshake.address + "  disconnected.");
    if (socket.username != "") {
      socket.broadcast.emit(
        "system message",
        "User " + socket.username + " has left the chat-room."
      );

      connectedUsers.splice(connectedUsers.indexOf(socket), 1);
      updateConnectedUsers();
    }
  });
  // Broadcast the message to all clients
  socket.on("send message", sendMessage);
  socket.on("new client username", function(username) {
    socket.username = username;
    connectedUsers.push(socket);
    socket.broadcast.emit(
      "system message",
      "User " + socket.username + " has joined the chatroom."
    );
    updateConnectedUsers();
  });
}

function sendMessage(message) {
  // Broadcast the message to all clients
  if (message.content.includes("/stock=")) {
    let stock = message.content
      .substring("/stock=".length, message.content.length)
      .toLowerCase()
      .trim();
    csv()
      .fromStream(
        request
          .get("https://stooq.com/q/l/?s=" + stock + "&f=sd2t2ohlcv&h&e=csv")
          .on("error", function() {
            console.error("GET request error");
            io.sockets.emit("new message", {
                content: "It was not possible to connect with stooq. Maybe the internet connection?",
                username: "bot-share",
                timestamp: new Date()
            });
          })
      )
      .subscribe(json => {
        if (!json.Open.includes("N/D")) {
          io.sockets.emit("new message", {
            content: json.Symbol + " quote is $" + json.Open + " per share.",
            username: "bot-share",
            timestamp: new Date()
          });
        } else {
          io.sockets.emit("new message", {
            content: stock + " stock share was not found.",
            username: "bot-share",
            timestamp: new Date()
          });
        }
      });
  } else {
    io.sockets.emit("new message", message);
  }
}
function updateConnectedUsers() {
  usernames = [];
  for (i = 0; i < connectedUsers.length; i++) {
    usernames.push(connectedUsers[i].username);
  }
  io.sockets.emit("update current users", usernames);
}
