const express = require("express");
const app = express();
const http = require("http").createServer(app);
const path = require("path");
var io = require("socket.io")(http);
port = 3000;
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});
var upvote_count = 0;
io.on("connection", (socket) => {
  console.log("a user has connected!");
  socket.on("disconnect", function () {
    console.log("user disconnected");
  });
  socket.on("upvote-event", function (upvote_flag) {
    upvote_count += upvote_flag ? 1 : -1;
    let f_str = upvote_count + (upvote_count == 1 ? " upvote" : " upvotes");
    io.emit("update-upvotes", f_str);
  });
});

http.listen(port, () => {
  console.log("Server is ready on port ", port);
});
