"use strict";
exports.__esModule = true;
var replaceStream_1 = require("./replaceStream");
process.stdin
    .pipe(new replaceStream_1["default"](process.argv[2], process.argv[3]))
    .pipe(process.stdout);
