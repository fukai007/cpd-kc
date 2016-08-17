/**
  * @require ../cpdList.less
  *
  */

/**
  * @purpose 关键词热度排行榜
  * @createTime 2016-07-12 09:49
  * @Author miles_fk
  * 类不能加 ,
  */

import React, { Component } from 'react';
import reactDom from "react-dom";
import {History} from "/static/lib/reactRouter";
import $ from "jquery";
import PC from "/pagelet/parentClass/pc";
import EI from "/pagelet/cpdList/components/chartsItem";
import {getLegends,changeEcharts,initOptionsEcharts,onlegendselectchanged,getCurTime,send} from "/static/minxins/utils";


//es6 --> JS6 语法
export default class CPDList extends PC {
  constructor(props) {
    super(props);
    //测试数据
    this.state = {
          chartList : [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19]
    };
    this.upChartViewFlag=true;
  }

  /*
      @purpose 使用事件代理绑定鼠标移入移出事件
      @creatTime 2016-08-14 18:14
      @author miles_fk

      PS :
        1、定义：$.on( events [, selector ] [, data ], handler(eventObject) )
        2、@data |  类型: Anything | 当一个事件被触发时，要传递给事件处理函数的event.data。

   */
  onmouseEvent(){
      //var _this = this; 备用方案;通过作用域保存this
      $( "#cpdList" ).on( "mouseenter mouseleave",'.upChartView',this,function( event ) {
          event.data.upChartViewFlag = !event.data.upChartViewFlag;
      });
  }

   /*
      @purpose : 测试 bind是否把父级的this绑定到了clickEvent上
      @createTime :2016-08-14 22:03
      @author :miles_fk
   */
  clickEvent(){
      console.log("clickEvent.........")
  }
  /*
      @purpose 组件准备加载时要执行的
      @creatTime 2016-08-10 16:27
      @author miles_fk
   */
  componentWillMount(){

  }
  /*
      @purpose  组件准备加载时要执行的
      @creatTime 2016-08-10 16:27
      @author miles_fk
   */
  componentDidMount(){
      console.log(this.getPCName());
      var _this = this;

      //启动定时器，开始刷新数据
      setInterval(() => {
            console.log("定时器开始.........................................");
            if(_this.upChartViewFlag){

              console.log("定时器可执行.........................................");
              _this.state.chartList.map((item) => {
                    var   timer = Math.ceil(Math.random()*60)+60;
                    setTimeout(() => {
                        _this.refs['chart-'+item].upChartView();
                    }, timer);
              });
            }else{
              console.log('定时器没有执行'+this.upChartViewFlag+'....................................');
            }
           console.log("定时器结束.........................................");
      }, 8000);

      //绑定鼠标移入事件
      this.onmouseEvent();

  }
  componentWillUnmount(){

  }
  render(){
      var list = this.state.chartList || [];
      // 必须被包裹
      var head = (
          <div>
           <p>测试。。。。。</p>
           <span>sss</span>
          </div>
      );

      // 同上 ()---> 里面写JSX  {}--- 里面写 JS
      return(
        <div>
          {head}
          <div className='head' ></div>
          <div className="cpdList" id='cpdList'>
              {
                list.map((item) => {
                   return (
                    <EI nid={item} key={item} ref={"chart-"+item} clickEvent={this.clickEvent.bind(this)}>
                    </EI>
                   )
                })
              }

          </div>
        </div>
      )
  }
}


// CPDList.propTypes = {
//   highlighted: React.PropTypes.bool
// };
