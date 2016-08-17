import $ from "jquery";


var request = $.ajax;

$.ajax = function(params){
    var fail = [];
    var done = [];
    var always = [];
    var req = request.apply($, arguments);

    //4294Bug-2016-06-23 18:32-miles_fk
    var defaultfailFn = function(jqXHR, textStatus, d){
            switch (jqXHR.status){
                case(500):
                    data.statusText = "暂无数据";
                    break;
                // case(401):
                //     alert("未登录");
                //     break;
                // case(403):
                //     alert("无权限执行此操作");
                    break;
                case(408):
                    jqXHR.statusText = "请求超时,请重新刷新尝试.";
                    break;
                default:
                    jqXHR.statusText = "网络异常,请检查网络后重试.";
            }
        }

    var start = Date.now();

    req.fail(function(res){
        var args = arguments;

        send({
          type: "request",
          opra: params.url,
          label: "失败"
        });

        //执行默认的处理事件
        defaultfailFn.apply(this, args);

        fail.forEach((func)=>{
            func.apply(this, args);
        });
    });

    req.done(function(res){
        var args = arguments;
        var end = Date.now();

        // send({
        //   type: "request",
        //   opra: params.url,
        //   label: "成功-" + (end-start)
        // });

        done.forEach((func)=>{
            func.apply(this, args);
        });
    });
    
    req.always(function(res){
        var args = arguments;
        //console.log(args);

        always.forEach((func)=>{
            func.apply(this, args);
        });
    });

    return {
        always: function(func){
            always.push(func);
            return this;
        },
        done: function(func){
            done.push(func);
            return this;
        },
        fail: function(func){
            fail.push(func);
            return this;
        }
    }
};
//设置默认超时-2016-06-23 14:32-miles_fk
$.ajaxSetup({
        timeout : 30000, //设置30秒超时
});


let URL = {
    getParameters: function(){
        let search = location.search || "";
        let params = {};

        if(search){
            search = search.slice(1);
            let split = search.split("&");
            split.forEach(function(item){
                let m = item.match(/(\w+)=(\w+)/);
                if(m){
                    params[m[1]] = m[2];
                }
            });
        }
        return params;
    }
};

var getPar = function(search){
    var plist = search.split("&");
    var par = {};
    plist.forEach(function(item){
        let m = item.match(/(\w+)=(\w+)/);
        if(m){
            par[m[1]] = m[2];
        }
    });
    return par;
}

let bytesToSize = function(bytes) {
    if (bytes === 0) return '0 B';
    var k = 1000, // or 1024
        sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
        i = Math.floor(Math.log(bytes) / Math.log(k));
   return (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i];
}

var getCookie = function(name){
  var arr,
      reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
  if(arr=document.cookie.match(reg))
    return unescape(arr[2]);
  else
  return null;
};

function setCookie(cookiename, cookievalue, hours) {
  var date = new Date();
  date.setTime(date.getTime() + Number(hours) * 3600 * 1000);
  document.cookie = cookiename + "=" + cookievalue + "; path=/;expires = " + date.toGMTString();
};

function send(params){
  request.apply($,[{
    url: "/other/write-log",
    type:"get",
    data: params
  }]);
}


function getLegends(days){
  var curDate = new Date();
  var curDatetime = curDate.getTime();
  var arrays = [];

  if(days == 1 || days == -1){
    for(var i=0; i <= 23; i++){
      arrays.push(i+"时");
    }
  }else if(days == 7 || days == 15 || days == 30 || days == 60){
    for(var i=days; i > 0; i--){
      var d = new Date(curDatetime - 24 * 60 * 60 * 1000);
      arrays.push(d.format("yyyy-MM-dd"));
    }
  }
  return arrays;
}

/*
  @purpose 修改 X or Y 的间隔
  @createTime 2016-07-19 09:33
  @author miles_fk
*/
function changeEcharts(state,charts){
      var  ya = {};

      //修复BUG-4645-2016-06-28 17:22-miles_fk 根据最大值动态设置Y轴的间距
      if(state.maxValue < 5){
        ya.max = 4;
        ya.min = 1;
        ya.interval=1
      }else{
        ya.interval = "";
        //判断是不是第一次加载-2016-07-19 16:24-miles_fk
        if(!state.isInit){ //第一次不需要设置 max , 当max 改变后必须要初始化
          ya.max = undefined;
        }
        ya.min = 1;
      }

      charts.setOption({
        xAxis: state.xAxis,
        yAxis:ya,
        series: state.series,
        legend: state.legend
      });
}

/*
  @purpose 生成图表初始化参数
  @createTime 2016-07-19 09:33
  @author miles_fk
  @PS :
      深复制这个这个对象
      $.extend(true, target object, object1);
*/
function initOptionsEcharts(state){

  return $.extend(true, {},
    {
        title:{text: ''},

        grid: {
          top:'5',
          left: '1%',
          height: 150,
          right: '6%',
          bottom: '5%',
          containLabel: true
        },
        tooltip: {
          trigger: 'axis',     //按坐标轴触发显示 [fengjun 2016-06-16 09:38:59]
          // formatter: function (params) {
          //     var d = params[0];
          //     window.console.log(params);
          //     var templateFn = _.template($("#fkmu").html());
          //     var x = templateFn(d);
          //     return x;
          // }
        },
        legend: state.legend,
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: [],
          // axisLabel: {
          //   interval: 1,
          //   rotate : -90
          // },
          //interval : 'auto'
          //interval : 1
        },
        yAxis: {
          scale: true,
          interval: 1, // [2016-06-28 10:01-miles_fk-自动计算的坐标轴最小间隔大小。 例如可以设置成1保证坐标轴分割刻度显示成整数。]
            splitArea: {
            show: true
            },
          min:1,            //最小刻度为1，解决小数显示问题  [fengjun 2016-06-16 09:39:59]
          inverse:true  //纵坐标倒置，后续开放[lfj 2016-6-16 17:06:25]
        },
        series: []
    });
}


function makeRandom() {
    return ( Math.ceil(Math.random()*60)  +  (Math.ceil(Math.random()*4)*100)  );
}

function makeRandomList(length){
      var rl = [];
      for (let i = 0; i < length; i++) {
        rl.push(makeRandom());
      }
      return rl;
}
/*
  @purpose 绑定 图例点击事件，当隐藏一条线时重新计算maxValue和Y轴间隔
  @createTime 2016-07-19 17:20
  @author miles_fk
*/
function onlegendselectchanged(params) {
          var isLine = false;   //图表中是否有线的标识位，默认没有线
          var s  = params.selected;  //获取图表中所有线的状态

          //准备工作
          for(var key in s){
               /*
                   如果还有线则跳出循环走，不走场景一，因为还有线显示在图表上，除了刚才选择的线
               */
               if(s[key] == true){
                  isLine = true
                  break;
               }
          }
          // 场景一 : 没有选线的时候
          if(isLine == false){
              this.state.maxValue = 1;
              changeEcharts(this.state,this.chart);
          }else{
          // 场景二 : 关闭某一根线的时候,获取其余线的最大值
              var outTm = 1;
              $.each(this.state.series,function(index,value){
                 //如果这根线还在图表中则取这个线的最大值
                 if(s[value.name] == true){

                      var  inTm = _.max(value.data) * 1;  //确保最大值 是整数
                      window.console.log("inTm----------------->"+inTm);
                      //如果大于maxValue 则更新
                      if(inTm > outTm){
                          outTm = inTm;
                      }

                 }

              });

              this.state.maxValue = outTm;

          }

          this.state.maxValue = this.state.maxValue * 1; //字符串变成整数

          this.state.isInit = false;
          //重新设置 图表的间隔线
          changeEcharts(this.state,this.chart);

}
export default {
  URL, bytesToSize, getCookie,
  setCookie, send, getLegends,
  changeEcharts,initOptionsEcharts,
  onlegendselectchanged,getPar,makeRandom,makeRandomList
};
