define('fis-conf_test', function(require, exports, module) {

  /**
   *FIS3 config
   *@Author: jingfeng.lu
   */
  
  "use strict";
  
  var PROJECT_NAME = "IOS-watcher";
  var LOCAL_HOST_DOMAIN = "";
  var PRODUCTION_DOMAIN = "";
  
  var JQUERY = 'jquery';
  var REACT = 'react';
  var REFLUX = 'reflux';
  var REACT_ROUTER = 'reactRouter';
  var ISCROLL_LITE = 'iscrollLite';
  
  var OUTPUT_DIR = "./output";
  
  fis.config.set("project.watch.usePolling", true);
  fis.set('project.charset', 'utf-8');
  fis.set('project.md5Length', 8);
  fis.set('project.md5Connector ', '_');
  fis.set('project.ignore', ['node_modules/**', 'output/**', 'fis-conf.js', 'package.json']);
  
  //fis.hook('npm');
  //模块化钩子 commonjs规则
  fis.hook('commonjs', {});
  
  /*
      答疑解惑 :
        fis.match('/a/(**.js)', {
         release: '/b/$1' // $1 代表 (**.js) 匹配的内容
        });
  
        fis.match('/a/(**.js)', {
          release: '/b/$0' // $0 代表 /a/(**.js) 匹配的内容
        });
  
  
       match("/pages/(*.html)", {
          domain: LOCAL_HOST_DOMAIN,  //给文件 URL 设置cdn替换前缀。
          release: "/$1",
          deploy: fis.plugin('local-deliver', {
            to: OUTPUT_DIR
          })
  
   */
  // $1 代表 (**.js) 匹配的内容-2016-07-25 15:04-miles_fk
  fis.match("/static/lib/(react).js", { id: "$1", moduleId: "$1" });
  fis.match("/static/lib/(reflux).js", { id: "$1", moduleId: "$1" });
  fis.match("/static/lib/(reactRouter).js", { id: "$1", moduleId: "$1" });
  fis.match("/static/lib/(lodash).js", { id: "$1", moduleId: "$1" });
  fis.match("/static/lib/(jquery).js", { id: "$1", moduleId: "$1" });
  fis.match("/static/(constants).js", { id: "$1", moduleId: "$1" });
  
  //全局规则匹配
  fis.match('*.less', {
    parser: fis.plugin('less'),
    postprocessor: fis.plugin('autoprefixer', {
      browsers: ["Android >= 2.3", "ChromeAndroid > 1%", "iOS >= 4", "Firefox >= 20", "last 2 versions"],
      cascade: true
    }),
    rExt: '.css'
  }).match("*.{js,jsx}", {
    isMod: true,
    parser: ['babel'],
    rExt: 'js'
  }).match("**/mod.js", {
    isMod: false
  }).match("/pages/(*.html)", {
    domain: LOCAL_HOST_DOMAIN, //给文件 URL 设置cdn替换前缀。或者你自己定义的公共服务器地址
    release: "/$1",
    deploy: fis.plugin('local-deliver', {
      to: OUTPUT_DIR
    })
  });
  
  //开发环境规则----开始-------------------------------------------------------------------------------------------
  var development = fis.media("debug");
  
  //react .jsx 文件transfrom
  development.match('::package', {
    postpackager: [fis.plugin('loader', {})]
  });
  
  development.match('*.{jsx,js,less,css,png,jpg,jpeg,svg,eot,ttf,woff}', {
    domain: LOCAL_HOST_DOMAIN, //给文件 URL 设置cdn替换前缀。或者你自己定义的公共服务器地址-2016-07-25 17:29-miles_fk
    deploy: fis.plugin('local-deliver', { //放到指定目录下-2016-07-25 17:29-miles_fk
      to: OUTPUT_DIR
    })
  });
  //开发环境规则----结束-------------------------------------------------------------------------------------------
  
  //生产环境编译规则-----开始---------------------------------------------------------------------------------------
  var packToJs = "/pkg/pack.js";
  var packToCss = "/pkg/style.css";
  var production = fis.media("prod");
  
  production.match('**/mod.js', {
    packOrder: -100 //用来控制合并时的顺序，值越小越在前面。配合 packTo 一起使用.2016-07-25 17:30-miles_fk
  }).match("*.{js,jsx}", {
    optimizer: fis.plugin('uglify-js', {}), // fis-optimizer-uglify-js 插件进行压缩，已内置-2016-07-25 17:36-miles_fk
    packTo: packToJs
  }).match('::package', {
    postpackager: fis.plugin('loader', {
      allInOne: false
    }),
    spriter: fis.plugin('csssprites')
  }).match("/static/lib/echarts.min.js", {
    packTo: "/pkg/echart.js"
  });
  
  production.match('*.less', {
    useSprite: true,
    packTo: packToCss,
    optimizer: fis.plugin('clean-css', {}) // fis-optimizer-clean-css 插件进行压缩，已内置-2016-07-25 17:39-miles_fk
  });
  
  production.match('*.{jsx,js,less,css,png,jpg,jpeg,svg,eot,ttf,woff}', {
    domain: PRODUCTION_DOMAIN, //给文件 URL 设置cdn替换前缀。或者你自己定义的公共服务器地址
    useHash: true,
    deploy: fis.plugin('local-deliver', { //放到指定目录下-2016-07-25 17:29-miles_fk
      to: OUTPUT_DIR
    })
  });
  //生产环境编译规则-----结束---------------------------------------------------------------------------------------

});
