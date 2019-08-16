"use strict";
exports.__esModule = true;
var replaceStream_1 = require("./replaceStream");
var re = new replaceStream_1["default"]("World", "Nodejs");
re.on("data", function (chunk) { return console.log(chunk.toString()); });
re.write("Hello W");
re.write("orld!");
re.end();
