function Person(name, age) {
  this.name = name;
  this.age = age;
}

Person.prototype.getName = function() {
  return `name is ${this.name} and age is ${this.age}`;
};

function Student(className) {
  this.className = className;
}

Student.prototype.getClass = function() {
  return `class is ${this.className}`;
};

let p1 = new Person("zhangsan", 12);

Student.prototype = p1;

let s1 = new Student("class 1");
console.log(s1.getName());
console.log(s1.getClass());
