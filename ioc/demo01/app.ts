import Screen from "./screen";
import Cpu from "./cpu";
import Battery from "./battery";

export default class MacBook {
  cpu: Cpu;
  screen: Screen;
  battery: Battery;
  constructor() {
    this.cpu = new Cpu();
    this.screen = new Screen();
    this.battery = new Battery();
  }
  start() {
    console.log(
      `your mac screen is battery mode is ${this.battery.mode}, screen is ${
        this.screen.name
      } and cpu is ${this.cpu.name}`
    );
  }
}
