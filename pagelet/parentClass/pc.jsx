import React, { Component } from 'react';
import $ from 'jquery';

/*
    @purpose 项目基础类
    @createTime 2016-08-13 16:19
    @author miles_fk

    PS
       1、分号结尾
       2、

 */
 class PC extends Component{

    //构造器
    constructor(props) {
      var x = 0;
      super(props);
      this.state = { liked: false };
    };
    //实例方法
    getPCName(){
      return "pc";
    };
};


/*
    @purpose 添加要继承的方法
    @createTime 2016-08-13 16:32
    @author miles_fk
 */
PC.prototype.pfn4 = function() {
    console.log($.extend);
    console.log('pfn1.............................');
}

//TODO 继承类和扩展父类 ，可扩展多个类,具体用法查询$.extend的方法
$.extend(PC.prototype,{
  pfn3 : function(){
    console.log('pfn3.............................');
  }
});



/*
  for (let i = 0; i <3; i++) {
      PC.prototype['pfn'+i] = function () {
            //没有闭包问题
            console.log("i-------------->"+i);
      }
  }
  PC.TAG = "point"//添加一个静态属性
 */



export default PC;
