define('pagelet/hotkeyword/store/store', function(require, exports, module) {

  "use strict";
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
  
  var _reflux = require("reflux");
  
  var _reflux2 = _interopRequireDefault(_reflux);
  
  var _actionActionJs = require("pagelet/hotkeyword/action/action");
  
  var _actionActionJs2 = _interopRequireDefault(_actionActionJs);
  
  /*
    @purpose  增加热度排行
    @author miles_fk
    @createTime 2016-07-11 11:51
  */
  var HKWStore = _reflux2["default"].createStore({
  
    init: function init() {
      this.listenTo(_actionActionJs2["default"].hkwTopCmp, this.hkwTopCmp);
    },
  
    loading: function loading() {
      this.trigger({
        loading: true
      });
    },
  
    hkwTopCmp: function hkwTopCmp(res) {
      this.trigger(res);
    }
  });
  
  exports["default"] = HKWStore;
  module.exports = exports["default"];

});
