function Component(props, context) {
  this._dirty = true;

  /**
   * 组件上下文属性
   * @public
   * @type {object}
   */
  this.context = context;

  /**
   * @public
   * @type {object}
   */
  this.props = props;

  /**
   * @public
   * @type {object}
   */
  this.state = this.state || {};

  this._renderCallbacks = [];
}

function extend(obj, props) {
  for (let i in props) obj[i] = props[i];
  return obj;
}

/**
 * 给 Component 类的构造函数的原型上添加若干个方法
 */
extend(Component.prototype, {
  /**
   * 用来更新state树数据
   * @param {*} state
   * @param {*} callback
   */
  setState(state, callback) {
    if (!this.prevState) this.prevState = this.state;
    this.state = extend(
      extend({}, this.state),
      typeof state === "function" ? state(this.state, this.props) : state
    );
    if (callback) this._renderCallbacks.push(callback);
    enqueueRender(this);
  },

  /**
   * 与React的forceUpdate相同，立刻同步重新渲染组件
   * @param {*} callback
   */
  forceUpdate(callback) {
    if (callback) this._renderCallbacks.push(callback);
    renderComponent(this, FORCE_RENDER);
  },

  /**
   * 返回组件的渲染内容的虚拟dom，此处函数体为空
   */
  render() {}
});

function Ctor() {
  return {
    nodeName: "div"
  };
}

function doRender(props, state, context) {
  return this.constructor(props, context);
}

let inst = new Component({ name: "zhangsan" }, {});
inst.constructor = Ctor;
console.log(inst.constructor.name);
inst.render = doRender;

inst.render();
