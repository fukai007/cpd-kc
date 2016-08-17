
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

    HotKeywordAction.hkwTop();

  },

  componentWillUnmount: function(){
    this.unSubscribe();
  },

  onStateChange: function(state){
    console.log("---------------------------------");
  //  console.log(this);
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
          <div className="border tw98 ofa">
                  <ul className='kwDiv'>
                    <li className="cf6">关键词</li>
                    <li className="cf6">排名</li>
                    <li className="cf6">展示</li>
                    <li className="cf6">下载量</li>
                    <li className="cf6">花费</li>
                    <li className="cf6">出价</li>
                    <li className="cf6">数据</li>
                    <li className="cf6">操作</li>
                  </ul>

                  {
                    /*
                      1、循环时key必须是唯一的，如果有相同只会渲染第一个(和ID是一个意思)
                      2、循环时key必须是唯一的，要不然只会把key不同的渲染出来
                    */
                    list.map((item,index)=>{
                      return (
                            /*
                              1、循环时key必须是唯一的，如果有相同只会渲染第一个(和ID是一个意思)
                              2、循环时key必须是唯一的，要不然只会把key不同的渲染出来
                            */
                            list.map((item,index)=>{
                              return (
                                <div className='kwDiv'>
                                  <ul onClick={this.onItemClick} key={item.hot}>
                                    <li>
                                      {index+1}
                                    </li>
                                    <li className='kwc'>
                                      {item.keyword}
                                    </li>
                                    <li className="border-item">
                                      {item.hot}
                                    </li>
                                    <li className="border-item">
                                      {item.results}
                                    </li>
                                  </ul>
                                  <div ref='图表'></div>
                                </div>
                              )
                            })
                      )
                    })
                  }
                  {this.state.noDataFlag?<p className="center c999">暂无数据</p>:null}
          </div>
      </div>
    );
  }
});

export default HotKeywordTop;
