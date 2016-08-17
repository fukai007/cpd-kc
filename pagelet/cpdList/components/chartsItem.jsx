/**
  * @require ../echartsItem.less
  *
  */


/**
  * @purpose 关键词热度排行榜
  * @createTime 2016-07-12 09:49
  * @Author miles_fk
  * 类不能加 逗号
  */

import React, { Component } from 'react';
import reactDom from "react-dom";
import {History} from "/static/lib/reactRouter";
import $ from "jquery";
import PC from "/pagelet/parentClass/pc";
import {getLegends,changeEcharts,initOptionsEcharts,onlegendselectchanged,getCurTime,send,makeRandomList,makeRandom} from "/static/minxins/utils";


//es6 --> JS6 语法
export default class chartsItem extends PC {
  constructor(props) {
    super(props);
    this.state = {
      maxValue : 1,
      series: [],
      //图例外观的设置
      legend: {
        formatter: function(name){
          return name;
        },
        orient:"vertical",
        data:[],
        top: "50%", //修改图例距离上面的高度
        itemWidth:50,
      },
      nid : "chart-"+this.props.nid
    };
  }
  intChart(echarts){
    if(!this.refs[this.state.nid] || this.chart || !echarts){
      return;
    }
    this.chart = echarts.init(this.refs[this.state.nid]);


    // 使用函数生成图表的初始化数据-2016-07-19 11:09-miles_fk
    var option = initOptionsEcharts(this.state);


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
  initEchartData(){
          var option = {
              color: ['#3398DB','#ffc107','#FF5722','#009688'],
              tooltip : {
                  trigger: 'axis',
                  axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                      type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                  }
              },
              xAxis : [
                  {
                      type : 'category',
                      data : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                  }
              ],
              yAxis : {},
              series : [
                  {
                      name:'直接访问',
                      type:'bar',
                      data:[10, 52, 200, 334, 390, 330, 220]
                  }
              ]
          };
         this.chart.setOption(option);
    }

  upChartView(){
        var series = [
            {
                name:'直接访问',
                type:'bar',
                data:[]
            }
        ]
        series[0].data = makeRandomList(6);
        this.chart.setOption({
            series : series
        });

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
    require.async("/static/lib/echarts.min", (echarts)=>{
      this.intChart(echarts);
    });
      //console.log(this.getPCName());
  }
  componentWillUnmount(){

  }
  render(){
      return(
        <div
          ref={this.state.nid} className='ecItem upChartView' onClick={this.props.clickEvent}>
        </div>
      )
  }
}

/*
onMouseOver={this.props.mouseOverEvent}
onMouseOut={this.props.mouseOutEvent}
 */
