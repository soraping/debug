import { Readable } from "stream";
import * as Chance from "chance";

const chance = new Chance();

export default class RandomStream extends Readable {
  constructor(options?: any) {
    super(options);
  }

  _read(size) {
    const chunk = chance.string();
    console.log(`Pushing chunk of size: ${chunk.length}`);
    this.push(chunk, "utf8");
    if (chance.bool({ likelihood: 5 })) {
      this.push(null);
    }
  }
}
