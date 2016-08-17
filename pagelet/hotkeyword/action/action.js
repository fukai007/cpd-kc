import Reflux from "reflux";
import $ from "/static/lib/jquery";

var HotKeywordAction = Reflux.createActions([
  "fetchList",
  "fetchListCmp",
  "hkwTop",
  "hkwTopCmp"
]);

HotKeywordAction.fetchList.preEmit = function() {
    var params = {
        type: 'GET',
        url: SEARCH_HOST + '/iossercher',
        data:{
          param: serachKey,
          pageSize: 20,
          currentPage: page
        },
        dataType: 'json'
    }

    $.ajax(params).always(function( res ){
        HotKeywordAction.fetchListCmp(res);
    });
};



/*
  @purpose  增加热度排行接口
  @author miles_fk
  @createTime 2016-07-11 11:51
*/
HotKeywordAction.hkwTop.preEmit = function(par){
      var params = {
        type: 'GET',
        url: SEARCH_HOST + '/keywordSort',
        data:{

        },
        dataType: 'json'
    }

    $.ajax(params).always(function( res ){
        HotKeywordAction.hkwTopCmp(res);
    });
}

export default HotKeywordAction;