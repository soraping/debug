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
var Chance = require("chance");
var chance = new Chance();
var RandomStream = /** @class */ (function (_super) {
    __extends(RandomStream, _super);
    function RandomStream(options) {
        return _super.call(this, options) || this;
    }
    RandomStream.prototype._read = function (size) {
        var chunk = chance.string();
        console.log("Pushing chunk of size: " + chunk.length);
        this.push(chunk, "utf8");
        if (chance.bool({ likelihood: 5 })) {
            this.push(null);
        }
    };
    return RandomStream;
}(stream_1.Readable));
exports["default"] = RandomStream;
