const babel = require("babel-core");
const types = require("babel-types");

let code = "let add = () => a + b";

// babel 转化采用的是访问者模式Visitor 对于某个对象或者一组对象，不同的访问者，产生的结果不同，执行操作也不同
let visitor = {
  ArrowFunctionExpression(path) {
    // 获取节点
    let node = path.node;
    // 获取函数参数
    let params = node.params;
    // 函数体
    let body = node.body;
    // 判断是否是代码块
    if (!types.isBlockStatement(body)) {
      // 添加返回域 return
      let returnStatement = types.returnStatement(body);
      // 添加 {}
      body = types.blockStatement([returnStatement]);
    }
    /**
     * { type: 'FunctionExpression',
        id: null,
        params: [],
        body: { type: 'BlockStatement', body: [ [Object] ], directives: [] },
        generator: false,
        async: false }
     */
    let func = types.functionExpression(null, params, body, false, false);
    // 整体替换新的语法树
    path.replaceWith(func);
  }
};

let arrowPlugin = { visitor };

let result = babel.transform(code, {
  plugins: [arrowPlugin]
});

console.log(result.code);
