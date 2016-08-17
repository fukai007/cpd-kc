define('pagelet/hotkeyword/action/action', function(require, exports, module) {

  "use strict";
  
  Object.defineProperty(exports, "__esModule", {
      value: true
  });
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
  
  var _reflux = require("reflux");
  
  var _reflux2 = _interopRequireDefault(_reflux);
  
  var _staticLibJquery = require("jquery");
  
  var _staticLibJquery2 = _interopRequireDefault(_staticLibJquery);
  
  var HotKeywordAction = _reflux2["default"].createActions(["fetchList", "fetchListCmp", "hkwTop", "hkwTopCmp"]);
  
  HotKeywordAction.fetchList.preEmit = function () {
      var params = {
          type: 'GET',
          url: SEARCH_HOST + '/iossercher',
          data: {
              param: serachKey,
              pageSize: 20,
              currentPage: page
          },
          dataType: 'json'
      };
  
      _staticLibJquery2["default"].ajax(params).always(function (res) {
          HotKeywordAction.fetchListCmp(res);
      });
  };
  
  /*
    @purpose  增加热度排行接口
    @author miles_fk
    @createTime 2016-07-11 11:51
  */
  HotKeywordAction.hkwTop.preEmit = function (par) {
      var params = {
          type: 'GET',
          url: SEARCH_HOST + '/keywordSort',
          data: {},
          dataType: 'json'
      };
  
      _staticLibJquery2["default"].ajax(params).always(function (res) {
          HotKeywordAction.hkwTopCmp(res);
      });
  };
  
  exports["default"] = HotKeywordAction;
  module.exports = exports["default"];

});
