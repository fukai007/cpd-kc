define('pagelet/cpdList/components/chartsItem.jsx', function(require, exports, module) {

  /**
    * @require pagelet/cpdList/echartsItem.less
    *
    */
  
  /**
    * @purpose 关键词热度排行榜
    * @createTime 2016-07-12 09:49
    * @Author miles_fk
    * 类不能加 逗号
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
  
  var _staticMinxinsUtils = require("static/minxins/utils");
  
  //es6 --> JS6 语法
  
  var chartsItem = (function (_PC) {
      _inherits(chartsItem, _PC);
  
      function chartsItem(props) {
          _classCallCheck(this, chartsItem);
  
          _get(Object.getPrototypeOf(chartsItem.prototype), "constructor", this).call(this, props);
          this.state = {
              maxValue: 1,
              series: [],
              //图例外观的设置
              legend: {
                  formatter: function formatter(name) {
                      return name;
                  },
                  orient: "vertical",
                  data: [],
                  top: "50%", //修改图例距离上面的高度
                  itemWidth: 50
              },
              nid: "chart-" + this.props.nid
          };
      }
  
      /*
      onMouseOver={this.props.mouseOverEvent}
      onMouseOut={this.props.mouseOutEvent}
       */
  
      _createClass(chartsItem, [{
          key: "intChart",
          value: function intChart(echarts) {
              if (!this.refs[this.state.nid] || this.chart || !echarts) {
                  return;
              }
              this.chart = echarts.init(this.refs[this.state.nid]);
  
              // 使用函数生成图表的初始化数据-2016-07-19 11:09-miles_fk
              var option = (0, _staticMinxinsUtils.initOptionsEcharts)(this.state);
  
              //绑定图例的点击事件-2016-07-19 miles_fk
              //this.chart.on('legendselectchanged', onlegendselectchanged,this);
  
              //使用刚指定的配置项和数据显示图表。
              //this.chart.setOption(option);
  
              //this.chart.showLoading(); //初始化时加入动画 - 2016-06-11 17:09 - miles_fk
              this.initEchartData();
          }
  
          /*
              @purpose 初始化图表数据
              @crateTime 2016-07-19 11:12
              @author miles_fk
          */
      }, {
          key: "initEchartData",
          value: function initEchartData() {
              var option = {
                  color: ['#3398DB', '#ffc107', '#FF5722', '#009688'],
                  tooltip: {
                      trigger: 'axis',
                      axisPointer: { // 坐标轴指示器，坐标轴触发有效
                          type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                      }
                  },
                  xAxis: [{
                      type: 'category',
                      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                  }],
                  yAxis: {},
                  series: [{
                      name: '直接访问',
                      type: 'bar',
                      data: [10, 52, 200, 334, 390, 330, 220]
                  }]
              };
              this.chart.setOption(option);
          }
      }, {
          key: "upChartView",
          value: function upChartView() {
              var series = [{
                  name: '直接访问',
                  type: 'bar',
                  data: []
              }];
              series[0].data = (0, _staticMinxinsUtils.makeRandomList)(6);
              this.chart.setOption({
                  series: series
              });
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
              var _this = this;
  
              require.async(["static/lib/echarts.min"], function (echarts) {
                  _this.intChart(echarts);
              });
              //console.log(this.getPCName());
          }
      }, {
          key: "componentWillUnmount",
          value: function componentWillUnmount() {}
      }, {
          key: "render",
          value: function render() {
              return _react2["default"].createElement("div", {
                  ref: this.state.nid, className: "ecItem upChartView", onClick: this.props.clickEvent });
          }
      }]);
  
      return chartsItem;
  })(_pageletParentClassPc2["default"]);
  
  exports["default"] = chartsItem;
  module.exports = exports["default"];

});
