const http = require("http");
const fs = require("fs");
const zlib = require("zlib");
const crypto = require("crypto");

const key = Buffer.from("9vApxLk5G3PAsJrM", "utf8");
const iv = Buffer.from("FnJL7EDzjqWjcaY9", "utf8");

const server = http.createServer((req, res) => {
  const filename = req.headers.filename;
  console.log("file request received: " + filename);
  const saveFilename = filename + ".gz";
  req
    .pipe(crypto.createDecipheriv("aes-128-cbc", key, iv))
    .pipe(zlib.createGunzip())
    .pipe(fs.createWriteStream(saveFilename))
    .on("finish", () => {
      res.writeHead(201, { "Content-Type": "text/plain" });
      res.end("That is it \n");
      console.log("file saved: " + saveFilename);
    });
});

server.listen(3000, () => console.log("server start port 3000"));
