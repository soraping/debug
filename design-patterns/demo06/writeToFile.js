"use strict";
exports.__esModule = true;
var toFileStream_1 = require("./toFileStream");
var tfs = new toFileStream_1["default"]();
tfs.write({ path: "file1.txt", content: "hello" });
tfs.write({ path: "file2.txt", content: "nodejs" });
tfs.write({ path: "file3.txt", content: "stream" });
tfs.end(function () { return console.log("all files created"); });
