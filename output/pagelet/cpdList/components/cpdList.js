define('pagelet/cpdList/components/cpdList.jsx', function(require, exports, module) {

  /**
    * @require pagelet/cpdList/cpdList.less
    *
    */
  
  /**
    * @purpose 关键词热度排行榜
    * @createTime 2016-07-12 09:49
    * @Author miles_fk
    * 类不能加 ,
    */
  
  "use strict";
  
  Object.defineProperty(exports, "__esModule", {
      value: true
  });
  
  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
  
  var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
  
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
  
  function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
  
  var _react = require('react');
  
  var _react2 = _interopRequireDefault(_react);
  
  var _reactDom = require("react-dom");
  
  var _reactDom2 = _interopRequireDefault(_reactDom);
  
  var _staticLibReactRouter = require("reactRouter");
  
  var _jquery = require("jquery");
  
  var _jquery2 = _interopRequireDefault(_jquery);
  
  var _pageletParentClassPc = require("pagelet/parentClass/pc.jsx");
  
  var _pageletParentClassPc2 = _interopRequireDefault(_pageletParentClassPc);
  
  var _pageletCpdListComponentsChartsItem = require("pagelet/cpdList/components/chartsItem.jsx");
  
  var _pageletCpdListComponentsChartsItem2 = _interopRequireDefault(_pageletCpdListComponentsChartsItem);
  
  var _staticMinxinsUtils = require("static/minxins/utils");
  
  //es6 --> JS6 语法
  
  var CPDList = (function (_PC) {
      _inherits(CPDList, _PC);
  
      function CPDList(props) {
          _classCallCheck(this, CPDList);
  
          _get(Object.getPrototypeOf(CPDList.prototype), "constructor", this).call(this, props);
          //测试数据
          this.state = {
              chartList: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19]
          };
          this.upChartViewFlag = true;
      }
  
      // CPDList.propTypes = {
      //   highlighted: React.PropTypes.bool
      // };
  
      /*
          @purpose 使用事件代理绑定鼠标移入移出事件
          @creatTime 2016-08-14 18:14
          @author miles_fk
           PS :
            1、定义：$.on( events [, selector ] [, data ], handler(eventObject) )
            2、@data |  类型: Anything | 当一个事件被触发时，要传递给事件处理函数的event.data。
        */
  
      _createClass(CPDList, [{
          key: "onmouseEvent",
          value: function onmouseEvent() {
              //var _this = this; 备用方案;通过作用域保存this
              (0, _jquery2["default"])("#cpdList").on("mouseenter mouseleave", '.upChartView', this, function (event) {
                  event.data.upChartViewFlag = !event.data.upChartViewFlag;
              });
          }
  
          /*
             @purpose : 测试 bind是否把父级的this绑定到了clickEvent上
             @createTime :2016-08-14 22:03
             @author :miles_fk
          */
      }, {
          key: "clickEvent",
          value: function clickEvent() {
              console.log("clickEvent.........");
          }
  
          /*
              @purpose 组件准备加载时要执行的
              @creatTime 2016-08-10 16:27
              @author miles_fk
           */
      }, {
          key: "componentWillMount",
          value: function componentWillMount() {}
  
          /*
              @purpose  组件准备加载时要执行的
              @creatTime 2016-08-10 16:27
              @author miles_fk
           */
      }, {
          key: "componentDidMount",
          value: function componentDidMount() {
              var _this2 = this;
  
              console.log(this.getPCName());
              var _this = this;
  
              //启动定时器，开始刷新数据
              setInterval(function () {
                  console.log("定时器开始.........................................");
                  if (_this.upChartViewFlag) {
  
                      console.log("定时器可执行.........................................");
                      _this.state.chartList.map(function (item) {
                          var timer = Math.ceil(Math.random() * 60) + 60;
                          setTimeout(function () {
                              _this.refs['chart-' + item].upChartView();
                          }, timer);
                      });
                  } else {
                      console.log('定时器没有执行' + _this2.upChartViewFlag + '....................................');
                  }
                  console.log("定时器结束.........................................");
              }, 8000);
  
              //绑定鼠标移入事件
              this.onmouseEvent();
          }
      }, {
          key: "componentWillUnmount",
          value: function componentWillUnmount() {}
      }, {
          key: "render",
          value: function render() {
              var _this3 = this;
  
              var list = this.state.chartList || [];
              // 必须被包裹
              var head = _react2["default"].createElement(
                  "div",
                  null,
                  _react2["default"].createElement(
                      "p",
                      null,
                      "测试。。。。。"
                  ),
                  _react2["default"].createElement(
                      "span",
                      null,
                      "sss"
                  )
              );
  
              // 同上 ()---> 里面写JSX  {}--- 里面写 JS
              return _react2["default"].createElement(
                  "div",
                  null,
                  head,
                  _react2["default"].createElement("div", { className: "head" }),
                  _react2["default"].createElement(
                      "div",
                      { className: "cpdList", id: "cpdList" },
                      list.map(function (item) {
                          return _react2["default"].createElement(_pageletCpdListComponentsChartsItem2["default"], { nid: item, key: item, ref: "chart-" + item, clickEvent: _this3.clickEvent.bind(_this3) });
                      })
                  )
              );
          }
      }]);
  
      return CPDList;
  })(_pageletParentClassPc2["default"]);
  
  exports["default"] = CPDList;
  module.exports = exports["default"];

});
