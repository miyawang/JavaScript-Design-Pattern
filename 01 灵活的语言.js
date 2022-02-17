/*
 * @Author: Miya Wang
 * @Date: 2022-02-14 15:20:52
 * @LastEditors: Miya Wang
 * @LastEditTime: 2022-02-17 17:19:01
 * @Description: 《JavaScript 设计模式》 第一章 灵活的语言——JavaScript
 */

/**
 * 1.1 函数的另一种形式
 * 以下两种写法是一样的，都是定义了全局变量
 */

function xxx() {}
var xxx = function() {};

/**
 * 1.2 用对象收编变量
 * 减少覆盖与被覆盖
 */

var obj = {
  xxx: function() {},
};
obj.xxx();

/**
 * 1.3 对象的另一种形式
 * 声明后再加方法，函数也是对象
 */

var obj = function() {};
obj.xxx = function() {};

/**
 * 1.4 真假对象
 * 表面上是同一个对象，实际上每次返回的都是新对象
 * 这样就可以给其他人用了
 */

var obj = function() {
  return {
    xxx: function() {},
  };
};

/**
 * 1.5 类也可以
 * 新创建的对象都会有自己的一套方法。消耗比较大。
 */

var Obj = function() {
  this.xxx = function() {};
};
var a = new Obj();
a.xxx();

/**
 * 1.6 一个检测类
 * 原型上统一添加
 */
var Obj = function() {
  Obj.prototype.xxx = function() {}; // 这种方法要将 prototype 写很多遍
};

var Obj = function() {
  Obj.prototype = {
    xxx: function() {}, // 和上面的方法不能混用
  };
};

/**
 * 1.7 方法还可以这样用
 * 每一个方法末尾将当前对象返回，避免写很多遍 Obj.xxx() Obj.yyy()
 */

var obj = function() {
  obj.prototype = {
    xxx: function() {
      return this;
    },
    yyy: function() {
      return this;
    },
  };
};
obj.xxx().yyy();

/**
 * 1.8 函数的祖先
 * 使用源函数和原型，抽象出一个统一添加方法的功能方法，不要污染源生对象（Function、Array等）
 */

Function.prototype.addMethod = function (name, fn) {
  this[name] = fn;
};
var methods = function() {}; // or 下面一行
var methods = new Function();
methods.addMethod("xxx", function() {});
methods.xxx();

/**
 * 1.9 链式添加
 */

Function.prototype.addMethod = function (name, fn) {
  this[name] = fn;
  return this;
};

/**
 * 1.10 换一种方式使用方法
 * 函数式调用、类式调用 兼顾
 */

Function.prototype.addMethod = function (name, fn) {
  this.prototype[name] = fn;
  return this;
};
var Methods = function() {};
var m = new Methods();
m.xxx();
