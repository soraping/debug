/**
 * 模块加载器
 * @param {*} filename 模块路径
 * @param {*} module 模块
 * @param {*} require
 */
function loadModule(filename, module, require) {
  const wrappedSrc = `(function(module, exports, require){
    ${fs.readFileSync(filename, "utf-8")}
  })(module, module.export, require)`;
  eval(wrappedSrc);
}

const require = moduleName => {
  console.log(`Require invoked for module: ${moduleName}`);
  // 通过 require.resolve() 来解析模块的完整路径，这里赋值于变量 id
  const id = require.resolve(moduleName);
  // 判断模块是否缓存，如果有则直接返回
  if (require.cache[id]) {
    return require.cache[id].exports;
  }
  // 定义 module 对象，其中包含用空对象字面量初始化 exports 属性。此属性将用于模块的代码导出任何公共 api
  const module = {
    exports: {},
    id
  };
  // 缓存 module 对象
  require.cache[id] = module;
  // 模块源代码从其文件被读取，代码被执行。
  loadModule(id, module, require);
  // 最后，module.exports 的内容表示模块的公共 api ，返回给调用者
  return module.exports;
};

require.cache = {};
require.resolve = moduleName => {
  /** resolve a full module id from this moduleName */
};
