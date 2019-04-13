const Koa = require("koa");
const http = require("http");
const cors = require("koa2-cors");
const app = new Koa();

app.use(
  cors({
    credentials: true
  })
);

const server = http.createServer(app.callback());
const io = require("socket.io").listen(server);

server.listen(8080, () => {
  console.log("服务器运行于：localhost:8080");
});

io.sockets.on("connection", socket => {
  socket.on("disconnect", () => {});

  socket.on("message", () => {});

  socket.on("login", data => {
    console.log("login", data);
    socket.emit("users", { username: data.username });
  });
});
