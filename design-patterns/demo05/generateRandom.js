"use strict";
exports.__esModule = true;
var randomStream_1 = require("./randomStream");
var randomStream = new randomStream_1["default"]();
randomStream.on("readable", function () {
    var chunk;
    while ((chunk = randomStream.read()) != null) {
        console.log("chunk received: " + chunk.toString());
    }
});
