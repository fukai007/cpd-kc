define('pagelet/hotkeyword/components/hotKeywordTop000.jsx', function(require, exports, module) {

  
  /**
    * @require pagelet/hotkeyword/hotkeyword.less
    */
  
  /**
    * @purpose 关键词热度排行榜
    * @createTime 2016-07-12 09:49
    * @author miles_fk
    */
  
  "use strict";
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
  
  var _react = require("react");
  
  var _react2 = _interopRequireDefault(_react);
  
  var _staticLibReactRouter = require("reactRouter");
  
  var _jquery = require("jquery");
  
  var _jquery2 = _interopRequireDefault(_jquery);
  
  var _storeStore = require("pagelet/hotkeyword/store/store");
  
  var _storeStore2 = _interopRequireDefault(_storeStore);
  
  var _actionAction = require("pagelet/hotkeyword/action/action");
  
  var _actionAction2 = _interopRequireDefault(_actionAction);
  
  var _staticMinxinsUtils = require("static/minxins/utils");
  
  var HotKeywordTop = _react2["default"].createClass({
    displayName: "HotKeywordTop",
  
    mixins: [_staticLibReactRouter.History],
    getInitialState: function getInitialState() {
      return {
        loading: true,
        page: 1,
        pageSize: 20,
        device: 0,
        keywordList: [],
        noDataFlag: false
  
      };
    },
    componentWillMount: function componentWillMount() {
      this.startTime = new Date().getTime();
    },
    componentDidMount: function componentDidMount() {
      this.unSubscribe = _storeStore2["default"].listen(this.onStateChange);
  
      _actionAction2["default"].hkwTop();
    },
  
    componentWillUnmount: function componentWillUnmount() {
      this.unSubscribe();
    },
  
    onStateChange: function onStateChange(state) {
      console.log("---------------------------------");
      //  console.log(this);
      console.log("---------------------------------");
      this.setState({
        keywordList: state ? state : [],
        loading: false,
        noDataFlag: state ? false : true
      });
    },
  
    handleScroll: function handleScroll(e) {
      var _target = e.target;
  
      if (_target.offsetHeight + _target.scrollTop + 10 >= _target.scrollHeight) {
        this.loadMore();
      }
    },
    loadMore: function loadMore() {
      var page = this.state.page + 1;
      this.setState({
        page: page
      });
    },
  
    onItemClick: function onItemClick(data) {
  
      data.currentTarget.style.background = "#2894FF";
  
      var kwDom = data.currentTarget.getElementsByClassName('kwc')[0];
      var kwinfo = kwDom.innerText;
  
      var query = _jquery2["default"].extend({ 'searchWord': kwinfo }, {});
      this.history.pushState("", "search/input", query);
    },
    render: function render() {
      var query = this.props.location.query;
  
      return this.renderTop();
    },
  
    renderTop: function renderTop() {
      var _this = this;
  
      var list = this.state.keywordList || [];
  
      //根据page的页数去计算要显示的数量-2016-07-06 11:11-miles_fk
      list = list.slice(0, this.state.page * this.state.pageSize);
      return _react2["default"].createElement(
        "div",
        { className: "c-page under-app-list" },
        _react2["default"].createElement(
          "div",
          { className: "border tw98 ofa" },
          _react2["default"].createElement(
            "ul",
            { className: "kwDiv" },
            _react2["default"].createElement(
              "li",
              { className: "cf6" },
              "关键词"
            ),
            _react2["default"].createElement(
              "li",
              { className: "cf6" },
              "排名"
            ),
            _react2["default"].createElement(
              "li",
              { className: "cf6" },
              "展示"
            ),
            _react2["default"].createElement(
              "li",
              { className: "cf6" },
              "下载量"
            ),
            _react2["default"].createElement(
              "li",
              { className: "cf6" },
              "花费"
            ),
            _react2["default"].createElement(
              "li",
              { className: "cf6" },
              "出价"
            ),
            _react2["default"].createElement(
              "li",
              { className: "cf6" },
              "数据"
            ),
            _react2["default"].createElement(
              "li",
              { className: "cf6" },
              "操作"
            )
          ),
  
          /*
            1、循环时key必须是唯一的，如果有相同只会渲染第一个(和ID是一个意思)
            2、循环时key必须是唯一的，要不然只会把key不同的渲染出来
          */
          list.map(function (item, index) {
            return(
              /*
                1、循环时key必须是唯一的，如果有相同只会渲染第一个(和ID是一个意思)
                2、循环时key必须是唯一的，要不然只会把key不同的渲染出来
              */
              list.map(function (item, index) {
                return _react2["default"].createElement(
                  "div",
                  { className: "kwDiv" },
                  _react2["default"].createElement(
                    "ul",
                    { onClick: _this.onItemClick, key: item.hot },
                    _react2["default"].createElement(
                      "li",
                      null,
                      index + 1
                    ),
                    _react2["default"].createElement(
                      "li",
                      { className: "kwc" },
                      item.keyword
                    ),
                    _react2["default"].createElement(
                      "li",
                      { className: "border-item" },
                      item.hot
                    ),
                    _react2["default"].createElement(
                      "li",
                      { className: "border-item" },
                      item.results
                    )
                  ),
                  _react2["default"].createElement("div", { ref: "图表" })
                );
              })
            );
          }),
          this.state.noDataFlag ? _react2["default"].createElement(
            "p",
            { className: "center c999" },
            "暂无数据"
          ) : null
        )
      );
    }
  });
  
  exports["default"] = HotKeywordTop;
  module.exports = exports["default"];

});
