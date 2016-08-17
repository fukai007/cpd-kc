define('pagelet/parentClass/pc.jsx', function(require, exports, module) {

  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
  
  var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
  
  function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
  
  var _react = require('react');
  
  var _react2 = _interopRequireDefault(_react);
  
  var _jquery = require('jquery');
  
  var _jquery2 = _interopRequireDefault(_jquery);
  
  /*
      @purpose 项目基础类
      @createTime 2016-08-13 16:19
      @author miles_fk
  
      PS
         1、分号结尾
         2、
  
   */
  
  var PC = (function (_Component) {
    _inherits(PC, _Component);
  
    //构造器
  
    function PC(props) {
      _classCallCheck(this, PC);
  
      var x = 0;
      _get(Object.getPrototypeOf(PC.prototype), 'constructor', this).call(this, props);
      this.state = { liked: false };
    }
  
    _createClass(PC, [{
      key: 'getPCName',
  
      //实例方法
      value: function getPCName() {
        return "pc";
      }
    }]);
  
    return PC;
  })(_react.Component);
  
  ;
  
  /*
      @purpose 添加要继承的方法
      @createTime 2016-08-13 16:32
      @author miles_fk
   */
  PC.prototype.pfn4 = function () {
    console.log(_jquery2['default'].extend);
    console.log('pfn1.............................');
  };
  
  //TODO 继承类和扩展父类 ，可扩展多个类,具体用法查询$.extend的方法
  _jquery2['default'].extend(PC.prototype, {
    pfn3: function pfn3() {
      console.log('pfn3.............................');
    }
  });
  
  /*
    for (let i = 0; i <3; i++) {
        PC.prototype['pfn'+i] = function () {
              //没有闭包问题
              console.log("i-------------->"+i);
        }
    }
    PC.TAG = "point"//添加一个静态属性
   */
  
  exports['default'] = PC;
  module.exports = exports['default'];

});
