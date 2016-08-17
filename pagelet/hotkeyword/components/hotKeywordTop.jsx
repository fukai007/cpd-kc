
/**
  * @require ../hotkeyword.less
  */


/**
  * @purpose 关键词热度排行榜
  * @createTime 2016-07-12 09:49
  * @author miles_fk
  */

import React from "react";
import {History} from "/static/lib/reactRouter";

import $ from "jquery";


import HKWStore from "../store/store"
import HotKeywordAction from "../action/action";

import {send} from "/static/minxins/utils";


var HotKeywordTop = React.createClass({
  mixins: [History],
  getInitialState: function(){
    return {
        loading : true,
        page: 1,
        pageSize: 20,
        device:0,
        keywordList:[],
        noDataFlag : false

    }
  },
  componentWillMount : function(){
       this.startTime = (new Date()).getTime();
  },
  componentDidMount: function(){
    this.unSubscribe = HKWStore.listen(this.onStateChange);

    // 代理一个普通对象
    var target = {};
    var handler = {
        get: function(receiver, name) {
            return `Hello, ${name}!`;
        }
    };

    var p = new Proxy(target, handler);
    p.world === 'Hello, world!';

    HotKeywordAction.hkwTop();

  },

  componentWillUnmount: function(){
    this.unSubscribe();
  },

  onStateChange: function(state){
    console.log("---------------------------------");
    console.log(this);
    console.log("---------------------------------");
    this.setState({
      keywordList : state?state:[],
      loading  : false,
      noDataFlag : state?false:true
    });
  },

  handleScroll: function(e) {
    const _target = e.target;

    if (((_target.offsetHeight + _target.scrollTop + 10) >= _target.scrollHeight)) {
      this.loadMore();
    }
  },
  loadMore: function(){
    var page = this.state.page + 1;
    this.setState({
      page: page
    });
  },

  onItemClick: function(data){

    data.currentTarget.style.background = "#2894FF";

    var kwDom = data.currentTarget.getElementsByClassName('kwc')[0];
    var kwinfo = kwDom.innerText;

    var query = $.extend({'searchWord':kwinfo},{});
    this.history.pushState("", "search/input", query);

  },
  render: function(){
    var query = this.props.location.query;

    return this.renderTop();

  },

  renderTop: function(){
    var list = this.state.keywordList || [];


    //根据page的页数去计算要显示的数量-2016-07-06 11:11-miles_fk
    list = list.slice(0, this.state.page * this.state.pageSize);
    return (
      <div className="c-page under-app-list">
        <div className="c-body" onScroll={this.handleScroll}>
          <table className="border tw98">
              <thead>
                  <tr>
                    <th>排名</th>
                    <th>关键词</th>
                    <th className="border-item">搜索热度</th>
                    <th className="border-item">搜索结果数</th>
                  </tr>
              </thead>
                  {
                    /*
                      1、循环时key必须是唯一的，如果有相同只会渲染第一个(和ID是一个意思)
                      2、循环时key必须是唯一的，要不然只会把key不同的渲染出来
                      3、多重循环有问题
                      4、table 中可以写多个tbody !!!!! 这样就可以完成第一条是数据，第二条是表格的组件了
                      5、在table里可以有0个或多个tbody
                      6、合并多列 colSpan="4" [react 中 注意大小写 ]
                    */

                    list.map((item,index)=>{
                        console.log(item)
                        return(
                           <tbody key={index}>
                             <tr onClick={this.onItemClick} >
                               <td>
                                 {index+1}
                               </td>
                               <td className='kwc'>
                                 {item.keyword}
                               </td>
                               <td className="border-item">
                                 {item.hot}
                               </td>
                               <td className="border-item">
                                 {item.results}
                               </td>
                             </tr>
                             <tr><td colSpan="4">父爱库sdfsdfdsfsdfsddfdsfdsfsfdsf</td></tr>
                           </tbody>
                        )
                    })
                  }
          </table>
          {

                this.state.noDataFlag?<p className="center c999">暂无数据</p>:null
          }
        </div>
      </div>
    );
  }
});

export default HotKeywordTop;
