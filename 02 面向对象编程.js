/*
 * @Author: Miya Wang
 * @Date: 2022-02-15 15:33:32
 * @LastEditors: Miya Wang
 * @LastEditTime: 2022-02-17 17:18:44
 * @Description: 《JavaScript 设计模式》 第二章 写的都是看到的——面向对象编程
 */

/**
 * 2.2 包装明星——封装
 * 2.2.1 创建一个类
 * 使用 this 来为这个类增加属性
 * */

var Book = function (id, bookname, price) {
  this.id = id;
  this.bookname = bookname;
  this.price = price;
};

/**
 * 2.2 包装明星——封装
 * 2.2.1 创建一个类
 * 也可使用原型
 * */

Book.prototype.display = function () {};

/**
 * 2.2 包装明星——封装
 * 2.2.1 创建一个类
 * 还可以这样使用原型
 * */

Book.prototype = {
  display: function () {},
};

/**
 * 2.2 包装明星——封装
 * 2.2.1 创建一个类
 * 使用 new ，实例化这个类
 * */

var book = new Book(001, "如何阅读一本书", 66);
console.log(book.bookname); // 如何阅读一本书

/**
 * 2.2 包装明星——封装
 * 2.2.2 这些都是我的——属性与方法封装
 * 私有属性与私有方法，特权方法，对象公有属性和对象共有方法
 * */

var Book = function (id, name, price) {
  // 私有属性
  var num = 1;
  // 私有方法
  function checkId() {}
  // 特权方法：通过 this 创建的方法，不但可以访问这些对象的共有属性和共有方法，而且还可能访问到类（创建时）或对象自身的私有属性和私有方法，这些方法权利比较大
  this.getName = function () {};
  this.getPrice = function () {};
  this.setName = function () {};
  this.setPrice = function () {};
  // 对象公有属性：在函数内部通过 this 创建的属性和方法，在类创建对象时，每个对象自身都拥有一份并且可以在外部访问到，通过 this 创建的属性可看作是对象共有属性和对象共有方法
  this.id = id;
  // 对象公有方法
  this.copy = function () {};
  // 构造器：在创建对象时调用的特权方法还可以看作是类的构造器
  this.setName(name);
  this.setPrice(price);
};

// 类静态公有属性（对象不能访问）：在类外面通过点语法定义的属性以及方法被称为类的静态共有属性和类的静态共有方法
Book.isChinese = true;
// 类静态公有方法（对象不能访问）
Book.resetTime = function () {
  console.log("new time");
};
// 类通过 prototype 创建的属性或者方法在类实例的对象中是可以通过 this 访问到的，所以我们将 prototype 对象中的属性和方法称为共有属性和共有方法
Book.prototype = {
  // 公有属性
  isJSBook: false,
  // 公有方法
  display: function () {},
};

var b = new Book(216, "如何阅读一本书", 88);
// 类的构造函数外面通过点语法定义的属性方法不会添加到新创建的对象上
console.log(b.num); // undefined
// 类的原型 prototype 上定义的属性在新对象里就可以直接使用
console.log(b.isJSBook); // false
console.log(b.id); // 0216

// 要想在新创建的对象中使用 isChinese 就得通过 Book 类使用而不能通过 this
console.log(b.isChinese); // undefined

// 类的共有属性在对象中却可以通过点语法访问到但是类的静态公有属性可以通过类的自身访问
console.log(Book.isChinese); // true
Book.resetTime(); // new time

/**
 * 2.2 包装明星——封装
 * 2.2.3 你们看不到我——闭包实现
 * 我们经常将类的静态变量通过闭包来实现
 * */

// 利用闭包来实现
var Book = (function () {
  // 静态私有变量
  var bookNum = 0;
  // 静态私有方法
  function checkBook(name) {}
  // 返回构造函数
  return function (newId, newName, newPrice) {
    // 私有变量
    var name, price;
    // 私有方法
    function checkId(id) {
      // 特权方法
      this.getName = function () {};
      this.getPrice = function () {};
      this.setName = function () {};
      this.setPrice = function () {};
      // 公有属性
      this.id = id;
      // 公有方法
      this.copy = function () {};
      bookNum++;
      if (bookNum > 100) {
        throw new Error("仅有 100 本书");
      }
      // 构造器
      this.setName(name);
      this.setPrice(price);
    }
  };
})();
Book.prototype = {
  // 静态公有属性
  isJSBook: false,
  // 静态公有方法
  display: function () {},
};

// 在闭包外部添加原型属性和方法看似脱离了闭包这个类，所以有时候在闭包内部实现一个完整的类，然后将其返回
var Book = (function () {
  // 静态私有变量
  var bookNum = 0;
  // 静态私有方法
  function checkBook(name) {}
  // 返回构造函数
  function _book(newId, newName, newPrice) {
    // 私有变量
    var name, price;
    // 私有方法
    function checkId(id) {
      // 特权方法
      this.getName = function () {};
      this.getPrice = function () {};
      this.setName = function () {};
      this.setPrice = function () {};
      // 公有属性
      this.id = newId;
      // 公有方法
      this.copy = function () {};
      bookNum++;
      if (bookNum > 100) {
        throw new Error("仅有 100 本书");
      }
      // 构造器
      this.setName(name);
      this.setPrice(price);
    }
  }
  // 构建原型
  _book.prototype = {
    // 静态公有属性
    isJSBook: false,
    // 静态公有方法
    display: function () {},
  };
  return _book;
})();

/**
 * 2.2 包装明星——封装
 * 2.2.4 找位检察长——创建对象的安全模式
 * 忘记写 new 等错误
 * */

// 图书类
var Book = function (title, time, type) {
  this.title = title;
  this.time = time;
  this.type = type;
};
// 实例化一本书
var b = Book("JS", "2022", "fe"); // window

// 找位检察长
var Book = function (title, time, type) {
  // 判断执行过程中 this 是否是当前这个对象（如果是 说明是用 new 创建的）
  if (this instanceof Book) {
    this.title = title;
    this.time = time;
    this.type = type;
  } else {
    return new Book(title, time, type);
  }
};
var b = Book("JS", "2022", "fe");

/**
 * 2.3 传宗接代——继承
 * 2.3.1 类式继承
 * */

// 类式继承
// 声明父类
function FatherClass() {
  this.fatherValue = true;
}
// 为父类添加共有方法
FatherClass.prototype.getFatherValue = function () {
  return this.fatherValue;
};
// 声明子类
function ChildClass(params) {
  this.childValue = false;
}
// 继承父类
ChildClass.prototype = new FatherClass();
// 为子类添加共有方法
ChildClass.prototype.getChildValue = function () {
  return this.childValue;
};

// 使用子类
var instance = new ChildClass();
console.log(instance.getFatherValue()); // true
console.log(instance.getChildValue()); // false

// 通过 instanceof 来检测某个对象是否是某个类的实例
console.log(instance instanceof ChildClass); // true
console.log(instance instanceof FatherClass); // true
console.log(ChildClass instanceof FatherClass); // false
console.log(ChildClass.prototype instanceof FatherClass); // true 将 FatherClass 的实例赋值给了 ChildClass 的原型 prototype 所以是 ChildClass.prototype 继承了 FatherClass

console.log(instance instanceof Object); // true Object 是所有对象的实例

// 一个子类的实例更改子类原型从父类构造函数中继承来的共有属性就会直接影响到其他子类
function FatherClass() {
  this.books = ["js", "html", "css"];
}
function ChildClass() {}
ChildClass.prototype = new FatherClass();
var instance1 = new ChildClass();
var instance2 = new ChildClass();
console.log(instance2.books); // ["js", "html", "css"]
instance1.books.push("http");
console.log(instance2.books); // ["js", "html", "css", "http"]

/**
 * 2.3 传宗接代——继承
 * 2.3.2 创建即继承——构造函数继承
 * */

// 构造函数式继承
// 声明父类
function FatherClass(id) {
  // 引用类型共有属性
  this.books = ["js", "html", "css"];
  // 值类型共有属性
  this.id = id;
}
// 父类声明原型方法
FatherClass.prototype.showBooks = function () {
  console.log(this.books);
};
// 声明子类
function ChildClass(id) {
  // 继承父类
  FatherClass.call(this, id);
}
// 创建第一个子类的实例
var instance1 = new ChildClass(11);
// 创建第二个子类的实例
var instance2 = new ChildClass(22);
instance1.books.push("http");
console.log(instance1.books); // ["js", "html", "css", "http"]
console.log(instance1.id); // 11
console.log(instance2.books); // ["js", "html", "css"]
console.log(instance2.id); // 22
instance1.showBooks(); // Uncaught TypeError: instance1.showBooks is not a function

/**
 * 2.3 传宗接代——继承
 * 2.3.3 将优点为我所用——组合继承
 * */

// 结合类式继承和构造函数式继承的特点 组合式继承

// 声明父类
function FatherClass(name) {
  // 值类型共有属性
  this.name = name;
  // 引用类型共有属性
  this.books = ["js", "html", "css"];
}
// 父类原型共有方法
FatherClass.prototype.getName = function () {
  console.log(this.name);
};
// 声明子类
function ChildClass(name, time) {
  // 构造函数式继承父类 name 属性
  FatherClass.call(this, name);
  // 子类中新增共有属性
  this.time = time;
}
// 类式继承 子类原型继承父类
ChildClass.prototype = new FatherClass();
// 子类原型方法
ChildClass.prototype.getTime = function () {
  console.log(this.time);
};

var instance1 = new ChildClass("js", 2021);
instance1.books.push("http");
console.log(instance1.books); // ["js", "html", "css", "http"]
instance1.getName(); // js
instance1.getTime(); // 2021

var instance2 = new ChildClass("css", 2022);
console.log(instance2.books); // ["js", "html", "css"]
instance2.getName(); // css
instance2.getTime(); // 2022

/**
 * 2.3 传宗接代——继承
 * 2.3.4 洁净的继承者——原型式继承
 * */

// 原型式继承
function inheritObj(o) {
  // 声明一个过渡函数对象
  function F() {}
  // 过渡对象的原型继承父对象
  F.prototype = o;
  // 返回过渡对象的一个实例，该实例的原型继承了父对象
  return new F();
}

var book = {
  name: "js",
  alikeBook: ["css book", "html book"],
};
var newBook = inheritObj(book);
newBook.name = "http";
newBook.alikeBook.push("tcp");

var otherBook = inheritObj(book);
otherBook.name = "ui";
otherBook.alikeBook.push("ps");

// 跟类式继承一样，父类对象 book 中的值类型的属性被复制，引用类型的属性被共用
console.log(newBook.name); // http
console.log(newBook.alikeBook); // ["css book", "html book", "tcp", "ps"]
console.log(otherBook.name); // ui
console.log(otherBook.alikeBook); // ["css book", "html book", "tcp", "ps"]
console.log(book.name); // js
console.log(book.alikeBook); // ["css book", "html book", "tcp", "ps"]

/**
 * 2.3 传宗接代——继承
 * 2.3.5 如虎添翼——寄生式继承
 * */

// 寄生式继承
// 声明基对象
var book = {
  name: "js",
  alikeBook: ["css", "html"],
};
function createBook(obj) {
  // 通过原型继承方式创建新对象
  var o = new inheritObj(obj);
  // 拓展新对象
  o.getName = function () {
    console.log(name);
  };
  // 返回拓展后的新对象
  return o;
}

/**
 * 2.3 传宗接代——继承
 * 2.3.6 终极继承者——寄生组合式继承
 * */

function inheritPrototype(childClass, fatherClass) {
  // 复制一份父类的原型副本保存在变量中
  var p = inheritObj(fatherClass.prototype);
  // 修正因为重写子类原型导致子类的 constructor 属性被修改
  // 对父原型对象复制得到的复制对象 p 的 constructor 指向的不是 ChildClass 子类对象，因此在寄生式继承中要对复制对象做一个增强，修复其 constructor 属性指向不正确的问题，
  // 最后将得到的复制对象 p 赋值给子类的原型，这样子类的原型就继承了父类的原型并且没有执行父类的构造函数。
  p.constructor = childClass;
  // 设置子类的原型
  childClass.prototype = p;
}

// 定义父类
function FatherClass(name) {
  this.name = name;
  this.colors = ["#f00", "#0f0", "#00f"];
}
// 定义父类原型方法
FatherClass.prototype.getName = function () {
  console.log(this.name);
};
// 定义子类
function ChildClass(name, time) {
  // 构造函数式继承
  FatherClass.call(this, name);
  // 子类新增属性
  this.time = time;
}
// 寄生式继承父类原型
inheritPrototype(ChildClass, FatherClass);
// 子类新增原型方法
ChildClass.prototype.getTime = function () {
  console.log(this.time);
};
// 创建两个测试方法
var instance1 = new ChildClass("js", 2021);
var instance2 = new ChildClass("css", 2022);

instance1.colors.push("#fff");
console.log(instance1.colors); // ["#f00", "#0f0", "#00f", "#fff"]
console.log(instance2.colors); // ["#f00", "#0f0", "#00f"]
instance2.getName(); // css
instance2.getTime(); // 2022

/**
 * 2.4 老师不止一位——多继承
 * */

// 单继承 属性复制
var extend = function (target, source) {
  // 遍历源对象中的属性
  for (let property in source) {
    // 将源对象中的属性复制到目标对象中
    target[property] = source[property];
  }
  // 返回目标对象
  return target;
};

var book = {
  name: "js",
  alikeBook: ["css", "html"],
};
var anotherBook = {
  color: "#ff0",
};
extend(anotherBook, book);
console.log(anotherBook.name); // js
console.log(anotherBook.alikeBook); // ["css", "html"]

anotherBook.alikeBook.push("http");
anotherBook.name = "tcp";
console.log(anotherBook.name); // tcp
console.log(anotherBook.alikeBook); // ["css", "html", "http"]
console.log(book.name); // js
console.log(book.alikeBook); // ["css", "html", "http"]

// 多继承 属性复制
var mix = function () {
  // 将传入的多个对象的属性复制到源对象中
  var i = 1, // 从第二个参数起为被继承的对象
    len = arguments.length, // 获取参数长度
    target = arguments[0], // 第一个对象为目标对象
    arg; // 缓存参数对象
  // 遍历被继承的对象
  for (; i < len; i++) {
    // 缓存当前对象
    arg = arguments[i];
    // 遍历被继承对象中的属性
    for (const k in arg) {
      // 将被继承对象中的属性复制到目标对象中
      target[k] = arg[k];
    }
  }
  // 返回目标对象
  return target;
};
// 也可以将它绑定到 Object 上
Object.prototype.mix = function () {
  var i = 1, // 从第二个参数起为被继承的对象
    len = arguments.length, // 获取参数长度
    arg; // 缓存参数对象
  // 遍历被继承的对象
  for (; i < len; i++) {
    // 缓存当前对象
    arg = arguments[i];
    // 遍历被继承对象中的属性
    for (const k in arg) {
      this[k] = arg[k];
    }
  }
};

otherBook.mix(anotherBook, book);
console.log(anotherBook); // {color: "#ff0", name: "tcp", alikeBook: Array(3)}

/**
 * 2.5 多种调用方式——多态
 * */
// 多态
function add() {
  // 获取参数
  var arg = arguments,
    // 获取参数长度
    len = arg.length;
  switch (len) {
    // 如果没有参数
    case 0:
      return 10;
    // 如只有一个参数
    case 1:
      return 10 + arg[0];
    // 如有两个参数
    case 2:
      return arg[0] + arg[1];
  }
}

console.log(add()); // 10
console.log(add(2)); // 12
console.log(add(2, 3)); // 5

// 类形式
function Add() {
  // 无参数算法
  function zero() {
    return 10;
  }
  // 一个参数算法
  function one(num) {
    return 10 + num;
  }
  // 两个参数算法
  function two(num1, num2) {
    return num1 + num2;
  }
  this.add = function () {
    var arg = arguments;
    len = arg.length;
    switch (len) {
      // 如果没有参数
      case 0:
        return zero();
      // 如只有一个参数
      case 1:
        return one(arg[0]);
      // 如有两个参数
      case 2:
        return two(arg[0], arg[1]);
    }
  };
}
// 实例化类
var A = new Add();
console.log(A.add()); // 10
console.log(A.add(2)); // 12
console.log(A.add(2, 3)); // 5
