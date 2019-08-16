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
var ReplaceStream = /** @class */ (function (_super) {
    __extends(ReplaceStream, _super);
    function ReplaceStream(searchString, replaceString, tailPiece) {
        if (tailPiece === void 0) { tailPiece = ""; }
        var _this = _super.call(this) || this;
        _this.searchString = searchString;
        _this.replaceString = replaceString;
        _this.tailPiece = tailPiece;
        return _this;
    }
    ReplaceStream.prototype._transform = function (chunk, encoding, callback) {
        var pieces = (this.tailPiece + chunk).split(this.searchString);
        var lastPiece = pieces[pieces.length - 1];
        var tailPieceLen = this.searchString.length - 1;
        this.tailPiece = lastPiece.slice(-tailPieceLen);
        pieces[pieces.length - 1] = lastPiece.slice(0, -tailPieceLen);
        this.push(pieces.join(this.replaceString));
        callback();
    };
    ReplaceStream.prototype._flush = function (callback) {
        this.push(this.tailPiece);
        callback();
    };
    return ReplaceStream;
}(stream_1.Transform));
exports["default"] = ReplaceStream;
