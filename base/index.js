let Person = {
  name: "zhangsan",
  say(age, className) {
    console.log(
      `say your name ${this.name}, age ${age}, className ${className}`
    );
  },
  speak([age, className]) {
    console.log(
      `speak your name ${this.name}, age ${age}, className ${className}`
    );
  }
};

let Person1 = {
  name: "lisi"
};

Person.say.call(Person1);

Function.prototype.myCall = function(context, ...args) {
  console.log(args);
  // [Function: say]
  console.log(this);
  let __ = (context[this.name] = this);
  __(...args);
};

Person.say.myCall(Person1, 12, "class1");

Function.prototype.myApply = function(context, args) {
  let __ = (context[this.name] = this);
  __(args);
};

Person.speak.myApply(Person1, [20, "class2"]);
