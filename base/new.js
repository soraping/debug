function myNew(Con, ...args) {
  // 创建一个空的对象
  let obj = {};
  // 链接到原型，obj 可以访问到构造函数原型中的属性
  obj.__proto__ = Con.prototype;
  // 绑定 this 实现继承，obj 可以访问到构造函数中的属性
  let ret = Con.call(obj, ...args);
  // 优先返回构造函数返回的对象
  return ret instanceof Object ? ret : obj;
}

function Person(name) {
  this.name = name;
}

Person.prototype.getName = function() {
  console.log(`your name is ${this.name}`);
};

let p2 = myNew(Person, "lisi");

p2.getName();
