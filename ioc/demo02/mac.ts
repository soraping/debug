import Screen from "./screen";
import Cpu from "./cpu";
import Battery from "./battery";

interface IMac {
  cpu: Cpu;
  screen: Screen;
  battery: Battery;
}

export default class MacBook {
  cpu: Cpu;
  screen: Screen;
  battery: Battery;
  constructor(option: IMac) {
    this.cpu = option.cpu;
    this.screen = option.screen;
    this.battery = option.battery;
  }
  start() {
    console.log(
      `your mac screen is battery mode is ${this.battery.mode}, screen is ${
        this.screen.name
      } and cpu is ${this.cpu.name}`
    );
  }
}
