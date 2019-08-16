import { Writable, WritableOptions } from "stream";
import { dirname } from "path";
import * as fs from "fs";
import * as mkdirp from "mkdirp";

interface IWriteAbleStream {
  path: string;
  content: string;
}

export default class ToFileStream extends Writable {
  constructor(option?: WritableOptions) {
    super(
      Object.assign({}, option, {
        objectMode: true
      })
    );
  }
  _write(chunk: IWriteAbleStream, encoding, callback) {
    mkdirp(dirname(chunk.path), err => {
      if (err) {
        return callback(err);
      } else {
        fs.writeFile(chunk.path, chunk.content, callback);
      }
    });
  }
}
