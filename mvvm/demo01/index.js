/**
 * ts写过了，js不会写了
 */
var MyVue = /** @class */ (function () {
    function MyVue(options) {
        this.$el = document.querySelector(options.el);
        this._data = options.data;
        this._watcherTpl = {};
        this._observer(this._data);
        this._compile(this.$el);
    }
    /**
     * 数据监听
     * 用Object.defineProperty()遍历data重写所有属性的get set。
     * 然后在给对象的某个属性赋值的时候，就会触发set。
     * 在set中我们可以监听到数据的变化，然后就可以触发watch更新视图。
     * @param data 数据
     */
    MyVue.prototype._observer = function (data) {
        var _this = this;
        Object.keys(data).forEach(function (key) {
            _this._watcherTpl[key] = {
                _directives: []
            };
            var value = data[key];
            // 添加数据的订阅池
            var watcherTpl = _this._watcherTpl[key];
            Object.defineProperty(_this._data, key, {
                configurable: true,
                enumerable: true,
                get: function () {
                    console.log(key + "\u83B7\u53D6\u503C: " + value);
                    return value;
                },
                set: function (newVal) {
                    console.log(key + "\u66F4\u65B0\u503C: " + newVal);
                    if (newVal != value) {
                        value = newVal;
                        // 遍历当前数据订阅池
                        watcherTpl._directives.forEach(function (item) {
                            // 遍历所有订阅的地方(v-model+v-bind+{{}})
                            // 触发this._compile()中发布的订阅Watcher 更新视图
                            item.update();
                        });
                    }
                }
            });
        });
    };
    /**
     * 模板编译
     * 首先是深度遍历dom树，遍历每个节点以及子节点
     * 将模板中的变量替换成数据，初始化渲染页面视图
     * 把指令绑定的属性添加到对应的订阅池中
     * 一旦数据有变动，收到通知，更新视图
     * @param el
     */
    MyVue.prototype._compile = function (el) {
        var _this = this;
        var nodes = el.children;
        var _loop_1 = function (i, len) {
            var node = nodes[i];
            if (node.children.length) {
                // 递归深度遍历 dom树
                this_1._compile(node);
            }
            // 如果有v-model属性，并且元素是INPUT或者TEXTAREA，我们监听它的input事件
            if (node.hasAttribute("v-model") &&
                (node.tagName == "INPUT" || node.tagName == "TEXTAREA")) {
                node.addEventListener("input", function () {
                    // v-model属性值
                    var attrVal = node.getAttribute("v-model");
                    // 将dom替换成属性的数据并发布订阅 在set的时候更新数据
                    _this._watcherTpl[attrVal]._directives.push(new Watcher({
                        el: node,
                        vm: _this,
                        val: attrVal,
                        attr: "innerHTML"
                    }));
                    // input值改变的时候 将新值赋给数据 触发set=>set触发watch 更新视图
                    _this._data[attrVal] = nodes[i]["value"];
                });
            }
            if (node.hasAttribute("v-bind")) {
                // v-bind属性值
                var attrVal2 = node.getAttribute("v-bind");
                this_1._watcherTpl[attrVal2]._directives.push(new Watcher({
                    el: node,
                    vm: this_1,
                    val: attrVal2,
                    attr: "innerHTML"
                }));
            }
            var reg = /\{\{\s*([^}]+\S)\s*\}\}/g;
            var txt = node.textContent;
            if (reg.test(txt)) {
                // matched匹配的文本节点包括{{}}, placeholder 是{{}}中间的属性名
                node.textContent = txt.replace(reg, function (matched, placeholder) {
                    // 所有绑定watch的数据
                    var getName = _this._watcherTpl;
                    // 获取对应watch 数据的值
                    var watcher = getName[placeholder];
                    if (!watcher._directives || !watcher._directives.length) {
                        watcher._directives = [];
                    }
                    // 将dom替换成属性的数据并发布订阅 在set的时候更新数据
                    watcher._directives.push(new Watcher({
                        el: node,
                        vm: _this,
                        val: placeholder,
                        attr: "innerHTML"
                    }));
                    return placeholder.split(".").reduce(function (val, key) {
                        // 获取数据的值 触发get 返回当前值
                        return _this._data[key];
                    }, _this.$el);
                });
            }
        };
        var this_1 = this;
        for (var i = 0, len = nodes.length; i < len; i++) {
            _loop_1(i, len);
        }
    };
    return MyVue;
}());
var Watcher = /** @class */ (function () {
    function Watcher(watcherOptions) {
        this.el = watcherOptions.el;
        this.val = watcherOptions.val;
        this.vm = watcherOptions.vm;
        this.attr = watcherOptions.attr;
        this.update();
    }
    Watcher.prototype.update = function () {
        // 获取data的最新值 赋值给dom 更新视图
        this.el[this.attr] = this.vm._data[this.val];
    };
    return Watcher;
}());
