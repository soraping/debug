type IModule<T> = T | T[];

export default class MacBook {
  private modules: any[] = [];

  use<T>(module: IModule<T>) {
    Array.isArray(module)
      ? module.map(item => this.use(item))
      : this.modules.push(module);
    return this;
  }

  start() {
    this.modules.map(
      module =>
        module.init && typeof module.init === "function" && module.init()
    );
  }
}
