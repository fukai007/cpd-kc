
import React from "/static/lib/react";
import reactDom from "/static/lib/react-dom";
import CPDList from "/pagelet/cpdList/components/cpdList";  // 加 .jsx 和不加没有区别
import {ReactRouter, Router, Route} from "/static/lib/reactRouter";
import $ from "/static/lib/jquery";
import HotKeywordTop from "/pagelet/hotkeyword/components/hotKeywordTop";




$.ajaxSetup ({
  cache: false //关闭AJAX缓存
});


reactDom.render(
  <Router>
    <Route path="/">
      <Route path="l" component={CPDList}/>
      <Route path="htt" component={HotKeywordTop}/>
    </Route>
  </Router>
, document.getElementById('cpdMain'));
