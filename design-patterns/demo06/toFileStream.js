"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var stream_1 = require("stream");
var path_1 = require("path");
var fs = require("fs");
var mkdirp = require("mkdirp");
var ToFileStream = /** @class */ (function (_super) {
    __extends(ToFileStream, _super);
    function ToFileStream(option) {
        return _super.call(this, Object.assign({}, option, { objectMode: true })) || this;
    }
    ToFileStream.prototype._write = function (chunk, encoding, callback) {
        mkdirp(path_1.dirname(chunk.path), function (err) {
            if (err) {
                return callback(err);
            }
            else {
                fs.writeFile(chunk.path, chunk.content, callback);
            }
        });
    };
    return ToFileStream;
}(stream_1.Writable));
exports["default"] = ToFileStream;
