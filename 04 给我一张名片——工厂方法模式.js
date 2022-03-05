/*
 * @Author: Miya Wang
 * @Date: 2022-02-18 14:09:14
 * @LastEditors: Miya Wang
 * @LastEditTime: 2022-03-05 21:42:19
 * @Description: 《JavaScript 设计模式》 第四章 给我一张名片——工厂方法模式
 */

/**
 * 4.1 广告展现
 * 假设要投放三个学科的广告
 */
// 创建 Java 学科
var Java = function (content) {
  // 将内容保存在 content 里面备用
  this.content = content;
    // 创建对象时，通过闭包，直接执行，将内容按需求的样式插入到页面内
    (function (content) {
      var div = document.createElement('div')
      div.innerHTML = content
      div.style.color = '#f00'
      document.getElementById('container').appendChild(div)
    }
  )(content)
}
// 创建 PHP 学科
var PHP = function (content) {
  this.content = content;
  (function (content) {
    var div = document.createElement('div')
    div.innerHTML = content
    div.style.color = '#ff0'
    document.getElementById('container').appendChild(div)
  })(content)
}
// 创建  JavaScript 学科
var JavaScript = function (content) {
  this.content = content;
  (function (content) {
    var div = document.createElement('div')
    div.innerHTML = content
    div.style.color = '#f0f'
    document.getElementById('container').appendChild(div)
  })(content)
}
// 学科类工厂
function JobFactory(type, content) {
  switch (type) {
    case 'java':
      return new Java(content)
    case 'php':
      return new PHP(content)
    case 'javascript':
      return new JavaScript(content)
    default:
      break
  }
}

JobFactory('javascript', '包含的广告内容')

/**
 * 4.2 方案的抉择
 * 来了更多的学科以后……
 * 简单工厂模式，新增一个学科就要改两处
 * 工厂方法模式：将实际创建对象工作推迟到子类中，这样核心类就成了抽象类
 * 可以将工厂方法看作是一个实例化对象的工厂类
 * 安全起见 --> 安全模式类 我们将创建对象的基类放在工厂方法类的原型中
 */

/**
 * 4.3 安全模式类
 * 是说可以屏蔽使用这对类的错误使用造成的错误（比如忽略了 new）
 * 解决方案：在构造函数开始时先判断当前对象 this 指代是不是类，如果是则通过 new 关键字创建
 * 如果不是，说明类在全局作用域中执行，通常指向 window，这样我们就要重新返回新创建的对象
 */


var Demo = function() {}
Demo.prototype = {
  show: function() {
    console.log('success');
  }
}
var d = new Demo()
d.show() // success
var d = Demo() // 避免忽略了 new 关键字直接执行类
d.show() // Uncaught TypeError: Cannot read property 'show' of undefined

// 在构造函数开始时先判断当前对象 this 指代的是不是类 Demo
var Demo = function() {
  if (!(this instanceof Demo)) {
    return new Demo()
  }
}
Demo.prototype = {
  show: function() {
    console.log('success');
  }
}
var d = Demo()
d.show() // success

/**
 * 4.4 安全的工厂方法
 * 好比我们在 Factory 类的原型里面注册了一张名片，以后需要哪类直接拿着这张名片，查找上面的信息就能找到这个类了
 * 不用担心使用时找不到基类的问题了
 */
// 安全模式创建的工厂类
var Factory = function(type, content) {
  if (this instanceof Factory) {
    var s = new this[type](content)
    return s
  } else {
    return new Factory(type, content)
  }
}
// 工厂原型中设置创建所有类型数据对象的基类
Factory.prototype = {
  Java: function(content) {
    // code
  },
  PHP: function(content) {
    // code
  },
  UI: function(content) {
    // code
  },
  JS: function(content) {
    // code
  }
}