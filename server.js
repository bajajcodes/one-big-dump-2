const express = require("express");
const next = require("next");
const axios = require("axios");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const http = require("http");
const socketIO = require("socket.io");

app.prepare().then(async () => {
  const server = express();
  const httpServer = http.createServer(server);
  const io = socketIO(httpServer);

  io.on("connection", (socket) => {
    console.log("Client connected");

    // socket.on("message1", (data) => {
    //   console.log("Recieved from message1 API ::", data);
    //   io.emit("message2", data);
    // });

    // socket.on("statusUpdate1", (data) => {
    //   console.log("Recieved from statusUpdate1 API ::", data);
    //   io.emit("statusUpdate2", data);
    // });

    // socket.on("transcript1", (data) => {
    //   console.log("Recieved from transcript1 API ::", data);
    //   io.emit("transcript2", data);
    // });

    socket.on("update", (data) => {
      if (data?.statusUpdate) {
        console.log("Received statusUpdate:", data.statusUpdate);
      }
      if (data?.transcript) {
        console.log("Received transcript:", data.transcript);
      }
      io.emit("update_client", data);
    });
  });

  server.all("*", (req, res) => {
    return handle(req, res);
  });

  const PORT = process.env.PORT || 3000;
  httpServer.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});
