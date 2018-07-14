var MyVue = (function () {
    function MyVue(options) {
        this._binding = {};
        this._el = options.el;
        this._methods = options.method;
        this._data = options.data;
        this._binding = {};
        this._observe(this._data);
        this._compile(this._el);
    }
    MyVue.prototype._observe = function (data) {
        this._data = new Proxy(data, {
            set: function (target, key, value, receiver) {
                var res = Reflect.set(target, key, value);
                return res;
            }
        });
    };
    MyVue.prototype._compile = function (el) { };
    return MyVue;
}());
var Watcher = (function () {
    function Watcher() {
    }
    return Watcher;
}());
//# sourceMappingURL=index.js.map