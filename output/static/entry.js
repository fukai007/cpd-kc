define('static/entry.jsx', function(require, exports, module) {

  "use strict";
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
  
  var _staticLibReact = require("react");
  
  var _staticLibReact2 = _interopRequireDefault(_staticLibReact);
  
  var _staticLibReactDom = require("react-dom");
  
  var _staticLibReactDom2 = _interopRequireDefault(_staticLibReactDom);
  
  var _pageletCpdListComponentsCpdList = require("pagelet/cpdList/components/cpdList.jsx");
  
  var _pageletCpdListComponentsCpdList2 = _interopRequireDefault(_pageletCpdListComponentsCpdList);
  
  // 加 .jsx 和不加没有区别
  
  var _staticLibReactRouter = require("reactRouter");
  
  var _staticLibJquery = require("jquery");
  
  var _staticLibJquery2 = _interopRequireDefault(_staticLibJquery);
  
  var _pageletHotkeywordComponentsHotKeywordTop = require("pagelet/hotkeyword/components/hotKeywordTop.jsx");
  
  var _pageletHotkeywordComponentsHotKeywordTop2 = _interopRequireDefault(_pageletHotkeywordComponentsHotKeywordTop);
  
  _staticLibJquery2["default"].ajaxSetup({
    cache: false //关闭AJAX缓存
  });
  
  _staticLibReactDom2["default"].render(_staticLibReact2["default"].createElement(
    _staticLibReactRouter.Router,
    null,
    _staticLibReact2["default"].createElement(
      _staticLibReactRouter.Route,
      { path: "/" },
      _staticLibReact2["default"].createElement(_staticLibReactRouter.Route, { path: "l", component: _pageletCpdListComponentsCpdList2["default"] }),
      _staticLibReact2["default"].createElement(_staticLibReactRouter.Route, { path: "htt", component: _pageletHotkeywordComponentsHotKeywordTop2["default"] })
    )
  ), document.getElementById('cpdMain'));

});
