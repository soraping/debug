type TMode = "normal" | "low" | "high";

export default class Battery {
  name = "battery";
  mode: string;
  constructor(option: { mode: TMode } = { mode: "normal" }) {
    this.mode = option.mode;
  }
  init() {
    console.log(`${this.name} start`);
  }
}
