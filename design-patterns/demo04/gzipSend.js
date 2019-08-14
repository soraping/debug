const fs = require("fs");
const zlib = require("zlib");
const http = require("http");
const path = require("path");
const crypto = require("crypto");

const file = process.argv[2];
const server = process.argv[3];

const options = {
  hostname: server,
  port: 3000,
  path: "/",
  method: "PUT",
  headers: {
    filename: path.basename(file),
    "Content-Type": "application/octet-stream",
    "Content-Encoding": "gzip"
  }
};

const req = http.request(options, res => {
  console.log("server response: " + res.statusCode);
});

const key = Buffer.from("9vApxLk5G3PAsJrM", "utf8");
const iv = Buffer.from("FnJL7EDzjqWjcaY9", "utf8");

fs.createReadStream(file)
  .pipe(zlib.createGzip())
  .pipe(crypto.createCipheriv("aes-128-cbc", key, iv))
  .pipe(req)
  .on("finish", () => console.log("file successfully send"));
