function _extends(child, parent) {
  function __() {
    this.constructor = child;
  }
  __.prototype = parent.prototype;
  child.prototype = new __();
}

function Person(name) {
  this.name = name;
  this.getName1 = function() {
    console.log("Person", this.name);
  };
}

Person.prototype.getName = function() {
  console.log("Person prototype", this.name);
};

var Student = (function(_super) {
  _extends(Student, Person);
  function Student(name, age) {
    this.age = age;
    _super.call(this, name);
  }
  Student.prototype.getInfo = function() {
    console.log("Student", this.age);
  };
  return Student;
})(Person);

let s = new Student("zhangsan", 12);

// Person prototype zhangsan
s.getName();
// Student 12
s.getInfo();

// 多重继承
_extends(MidStudent, Student);
function MidStudent(name, age, className) {
  this.className = className;
  Student.call(this, name, age);
}

let mids = new MidStudent("lisi", 16, "class1");
// Person prototype lisi
mids.getName();
// Student 16
mids.getInfo();
