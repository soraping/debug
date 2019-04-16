let esprima = require("esprima");
let estraverse = require("estraverse");
let escodegen = require("escodegen");

let code = "function add(a,b){return a + b}";

let tree = esprima.parseScript(code);

// 遍历语法树 tree
estraverse.traverse(tree, {
  // 将加改成减
  enter(node) {
    if (node.type == "FunctionDeclaration") {
      node.id.name = "sub";
    }
    if (node.type == "BinaryExpression") {
      node.operator = "-";
    }
  }
});

let result = escodegen.generate(tree);

console.log(result);
