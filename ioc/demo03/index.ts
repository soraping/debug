import MacBook from "./mac";
import Battery from "./battery";
import Cpu from "./cpu";
import Screen from "./screen";
import Touchpad from "./touchpad";

let mac = new MacBook();

mac
  .use(new Cpu())
  .use(new Screen())
  .use([new Battery(), new Touchpad()])
  .start();
