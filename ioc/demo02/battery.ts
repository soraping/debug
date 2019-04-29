type TMode = "normal" | "low" | "high";

export default class Battery {
  mode: string;
  constructor(option: { mode: TMode } = { mode: "normal" }) {
    this.mode = option.mode;
  }
}
