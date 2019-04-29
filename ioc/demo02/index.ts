import MacBook from "./mac";
import Battery from "./battery";
import Cpu from "./cpu";
import Screen from "./screen";

let mac = new MacBook({
  cpu: new Cpu(),
  screen: new Screen(),
  battery: new Battery()
});

mac.start();
