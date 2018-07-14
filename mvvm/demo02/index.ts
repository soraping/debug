interface IMyVue {
  el: Element;
  data: object;
  method: object;
}

class MyVue {
  private _el: Element;
  private _data: object;
  private _methods: object;
  private _binding = {};

  constructor(options: IMyVue) {
    this._el = options.el;
    this._methods = options.method;
    this._data = options.data;
    this._binding = {};
    this._observe(this._data);
    this._compile(this._el);
  }

  private _observe(data: object) {
    this._data = new Proxy(data, {
      set(target: any, key: string, value: any, receiver: any) {
        let res = Reflect.set(target, key, value);
        return res;
      }
    });
  }

  private _compile(el: Element) {}
}

class Watcher {}
