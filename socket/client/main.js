let socket = io.connect("http://localhost:8080");

socket.emit("login", { username: "user" + new Date().getTime() });

socket.on("users", data => {
  console.log("client user ", data);
});
