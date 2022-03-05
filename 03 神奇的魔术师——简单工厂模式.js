/*
 * @Author: Miya Wang
 * @Date: 2022-02-15 15:33:32
 * @LastEditors: Miya Wang
 * @LastEditTime: 2022-02-18 14:10:11
 * @Description: 《JavaScript 设计模式》 第三章 神奇的魔术师——简单工厂模式
 */
/**
 * 3.1 工作中的第一次需求
 * 登录模块：用户名输入不规范警示框
 */

var LoginAlert = function (text) {
  this.content = text
}

LoginAlert.prototype.show = function () {
  // 显示警示框
}

var userNameAlert = new LoginAlert('用户名不能多余16个字母或数字')
userNameAlert.show()

/**
 * 3.1 工作中的第一次需求
 * 登录模块：密码错误提示文案
 */

var pwdAlert = new LoginAlert('用户名不能多余16个字母或数字')
pwdAlert.show()

/**
 * 3.1 工作中的第一次需求
 * 登录模块：用户名不存在提示文案，且添加一个注册按钮
 */

var LoginConfirm = function (text) {
  this.content = text
}
LoginConfirm.prototype.show = function () {
  // 显示确认框
}
var loginFailConfirm = new LoginConfirm('您的用户名不存在，请重新输入')
loginFailConfirm.show()

/**
 * 3.1 工作中的第一次需求
 * 登录模块：登录成功后给出一个自定义提示框，除了有确定取消按钮，也提示一句‘欢迎回来’
 */

var LoginPrompt = function (text) {
  this.content = text
}
LoginPrompt.prototype.show = function () {
  // 显示提示框
}

/**
 * 3.2 如果类太多，那么提供一个
 * 注册模块复用登录模块
 * 类太多，都封装在一个函数里面，他人使用时不再关注创建这些对象到底依赖于哪个基类
 */

// 篮球基类
var Basketball = function () {
  this.intro = '篮球'
}
Basketball.prototype = {
  getMember: function () {
    console.log('需要 5 名队员')
  },
  getBallSize: function () {
    console.log('篮球很大')
  },
}
// 足球基类
var Football = function () {
  this.intro = '足球'
}
Football.prototype = {
  getMember: function () {
    console.log('需要 11 名队员')
  },
  getBallSize: function () {
    console.log('足球也很大')
  },
}
// 网球基类
var Tennis = function () {
  this.intro = '网球'
}
Tennis.prototype = {
  getMember: function () {
    console.log('需要 1 名队员')
  },
  getBallSize: function () {
    console.log('网球很小')
  },
}
// 运动工厂
var SportFactory = function (name) {
  switch (name) {
    case 'NBA':
      return new Basketball()
    case 'wordCup':
      return new Football()
    case 'FrenchOpen':
      return new Tennis()
    default:
      break
  }
}
// 为世界杯创建一个足球，只需要记住运动工厂 SportFactory，调用并创建
var football = SportFactory('wordCup')
console.log(football) // Football {intro: "足球"}
console.log(football.intro) // 足球
football.getMember() // 需要 11 名队员

/**
 * 3.2 如果类太多，那么提供一个
 * 注册模块复用登录模块
 * 登录模块改进
 */

var PopFactory = function (name) {
  switch (name) {
    case 'alert':
      return new LoginAlert()
    case 'confirm':
      return new LoginConfirm()
    case 'prompt':
      return new LoginPrompt()
    default:
      break
  }
}

/**
 * 3.3 一个对象有时也可代替许多类
 * 简单工厂模式的理念就是创建对象
 * 简单工厂模式还可以用来创建相似对象
 * 类似寄生继承模式
 * 这里没有父类，无需做任何继承，只需要创建一个对象，然后通过对这个对象大量拓展方法和属性，最终将对象返回出来
 */

// 工厂模式
function createBook(name, time, type) {
  // 创建一个对象，并对对象拓展属性和方法
  var o = new Object()
  o.name = name
  o.time = time
  o.type = type
  o.getName = function () {
    console.log(this.name)
  }
  // 将对象返回
  return o
}

var book1 = createBook('js', 2022, 'fe')
var book2 = createBook('css', 2021, 'fe')

book1.getName() // js
book2.getName() // css

// 将登陆模块的几个类使用工厂模式
function createPop(type, text) {
  // 创建一个对象，并对对象拓展属性和方法
  var o = new Object()
  o.content = text
  o.show = function () {
    // 显示方法
  }
  if (type === 'alert') {
    // 警示框差异部分
  }
  if (type === 'prompt') {
    // 提示框差异部分
  }
  if (type === 'confirm') {
    // 确认框差异部分
  }
  //
  return o
}
//
var userNameAlert = createPop('alert', '用户名只能是 26 个字母或数字')

/**
 * 3.4 你的理解决定你选择的方式
 * 通过类实例化对象
 * 通过创建一个新对象然后包装增强其属性和功能
 */
