import { Transform } from "stream";

export default class ReplaceStream extends Transform {
  constructor(
    private searchString: string,
    private replaceString: string,
    private tailPiece: string = ""
  ) {
    super();
  }
  _transform(chunk, encoding, callback) {
    const pieces = (this.tailPiece + chunk).split(this.searchString);
    const lastPiece = pieces[pieces.length - 1];
    const tailPieceLen = this.searchString.length - 1;

    this.tailPiece = lastPiece.slice(-tailPieceLen);
    pieces[pieces.length - 1] = lastPiece.slice(0, -tailPieceLen);
    this.push(pieces.join(this.replaceString));

    callback();
  }

  _flush(callback) {
    this.push(this.tailPiece);
    callback();
  }
}
