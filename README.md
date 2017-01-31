<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [目录结构](#%E7%9B%AE%E5%BD%95%E7%BB%93%E6%9E%84)
- [项目概述](#%E9%A1%B9%E7%9B%AE%E6%A6%82%E8%BF%B0)
- [需求概述](#%E9%9C%80%E6%B1%82%E6%A6%82%E8%BF%B0)
  - [关闭顶部通知条](#%E5%85%B3%E9%97%AD%E9%A1%B6%E9%83%A8%E9%80%9A%E7%9F%A5%E6%9D%A1)
  - [关注“网易教育产品部”/登录](#%E5%85%B3%E6%B3%A8%E7%BD%91%E6%98%93%E6%95%99%E8%82%B2%E4%BA%A7%E5%93%81%E9%83%A8%E7%99%BB%E5%BD%95)
  - [顶部右侧导航及内容区各产品的“了解更多”](#%E9%A1%B6%E9%83%A8%E5%8F%B3%E4%BE%A7%E5%AF%BC%E8%88%AA%E5%8F%8A%E5%86%85%E5%AE%B9%E5%8C%BA%E5%90%84%E4%BA%A7%E5%93%81%E7%9A%84%E4%BA%86%E8%A7%A3%E6%9B%B4%E5%A4%9A)
  - [banner轮播图](#banner%E8%BD%AE%E6%92%AD%E5%9B%BE)
  - [左侧内容 Tab 切换](#%E5%B7%A6%E4%BE%A7%E5%86%85%E5%AE%B9-tab-%E5%88%87%E6%8D%A2)
  - [查看课程详情](#%E6%9F%A5%E7%9C%8B%E8%AF%BE%E7%A8%8B%E8%AF%A6%E6%83%85)
  - [右侧“机构介绍”中的视频介绍](#%E5%8F%B3%E4%BE%A7%E6%9C%BA%E6%9E%84%E4%BB%8B%E7%BB%8D%E4%B8%AD%E7%9A%84%E8%A7%86%E9%A2%91%E4%BB%8B%E7%BB%8D)
  - [右侧“热门推荐”](#%E5%8F%B3%E4%BE%A7%E7%83%AD%E9%97%A8%E6%8E%A8%E8%8D%90)
  - [页面布局动态适应](#%E9%A1%B5%E9%9D%A2%E5%B8%83%E5%B1%80%E5%8A%A8%E6%80%81%E9%80%82%E5%BA%94)
- [实现要求](#%E5%AE%9E%E7%8E%B0%E8%A6%81%E6%B1%82)
  - [效果要求](#%E6%95%88%E6%9E%9C%E8%A6%81%E6%B1%82)
  - [功能要求](#%E5%8A%9F%E8%83%BD%E8%A6%81%E6%B1%82)
  - [兼容性要求](#%E5%85%BC%E5%AE%B9%E6%80%A7%E8%A6%81%E6%B1%82)
  - [HTML 要求](#html-%E8%A6%81%E6%B1%82)
  - [CSS 要求](#css-%E8%A6%81%E6%B1%82)
  - [JS 要求](#js-%E8%A6%81%E6%B1%82)
  - [其它要求](#%E5%85%B6%E5%AE%83%E8%A6%81%E6%B1%82)
- [CSS命名规范](#css%E5%91%BD%E5%90%8D%E8%A7%84%E8%8C%83)
- [图片优化](#%E5%9B%BE%E7%89%87%E4%BC%98%E5%8C%96)
- [JS 代码优化](#js-%E4%BB%A3%E7%A0%81%E4%BC%98%E5%8C%96)
- [说明](#%E8%AF%B4%E6%98%8E)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->


## 目录结构

```javascript

│─css
│      index.css
│      neatsey.css
│      
├─imgs
│      banner0.jpg
│      banner1.jpg
│      banner2.jpg
│      icon.png
│      play.png
│      sprite.png
│      video.jpg
│      videoBg.jpg
│      workplace0.jpg
│      workplace1.jpg
│      workplace2.jpg
│      workplace3.jpg
│      workplace4.jpg
│      workplace5.jpg
│      workplace6.jpg
│      workplace7.jpg
│      workplace8.jpg
│      workplace9.jpg
│      
├─js
│      Carousel.js
│      CourseFactory.js
│      Follow.js
│      index.js
│      LoginModal.js
│      Modal.js
│      Notice.js
│      TagCenter.js
│      VideoModal.js
│      
├─lib
│       ajax.js
│       animation.js
│       cookie.js
│       emitter.js
│       imgloader.js
│       md5.js
│       page.js
│       util.js
│       validator.js
│
├─index.html
└─README.md

```
**css**
存放外部 CSS 样式表。

**imgs**
存放外部图片资源。

**lib**
该文件为工具库，存放公共函数，包括：

* ajax.js XMLhttprequest请求
* animation.js 简单动画  
* cookie.js 本地存储
* emitter.js 自定义事件
* imgloader.js 图片预加载
* md5.js 加密
* page.js 分页字符串生成器
* util.js 原生 JavaScript 封装，解决兼容性
* validator.js 表单验证类

**js**
存放与系统相关的 JavaScript 组件模块，包括：

* Carousel.js 轮播组件
* CourseFactory.js 课程列表组件
* Follow.js 关注组件
* index.js 课程内容模块
* LoginModal.js 登录模态组件
* Modal.js 模态组件基类
* Notice.js 通知组件
* TagCenter.js 选项卡组件
* VideoModal.js 视频模态组件

## 项目概述
该页面重构为参与网易前端微专业期末大作业而实现。其中包括以下几个功能块：

1. 关闭顶部通知条
2. 关注“网易教育产品部”/登录
3. 顶部右侧导航及内容区各产品的“了解更多”
4. banner轮播图
5. 左侧内容区 Tab 切换
6. 查看课程详情
7. 右侧“机构介绍”中的视频介绍
8. 右侧“热门推荐”
9. 页面布局动态适应

## 需求概述

### 关闭顶部通知条
点击顶部通知条中的“X 不再提醒”后，刷新页面不再出现此通知条（使用本地cookie）。

### 关注“网易教育产品部”/登录

1. 点击关注按钮：首先判断登录的 cookie 是否已经设置（loginSuc）。
2. 如果未设置登录 cookie，则弹出登录框，使用给定的用户名和密码（需要表单验证）Ajax 调用服务器登录，成功登录后设置登录 cookie（loginSuc）。
3. 调用关注 API，并设置关注成功的 cookie（followSuc）。
4. 关注后“关注”按钮变成不可点击的“已关注”状态。

### 顶部右侧导航及内容区各产品的“了解更多”
点击导航中的“网易公开课”，“网易云课堂”，“中国大学 MOOC”，使用新窗口打开目标页面，对应跳转链接如下：

* 网易公开课：http://open.163.com/
* 网易云课堂：http://study.163.com/
* 中国大学MOOC：http://www.icourse163.org/

### banner轮播图

三张轮播图轮播效果：

* 实现每 5s 切换图片，图片循环播放。
* 鼠标悬停某张图片，则暂停切换。
* 切换效果使用入场图片 500ms 淡入的方式。

对应的跳转链接如下：

* banner1：http://open.163.com/
* banner2：http://study.163.com/
* banner3：http://www.icourse163.org/

### 左侧内容 Tab 切换
点击“产品设计”或“编程语言” Tab，实现下方课程内容的更换。

### 查看课程详情

* 鼠标悬停“产品设计”或“编程语言” Tab 下的任意课程卡片，出现浮层显示该课程的课程详情。
* 鼠标离开课程详情浮层，则浮层关闭。

### 右侧“机构介绍”中的视频介绍
点击“机构介绍”中的整块图片区域，调用浮层播放介绍视频。

### 右侧“热门推荐”
实现每次进入或刷新本页面，“热门推荐”模块中，接口返回20门课程数据，默认展示前10门课程，隔5秒更新一门课程，实现滚动更新热门课程的效果。

### 页面布局动态适应
根据浏览器窗口宽度，适应两种视觉布局尺寸。窗口宽度 < 1205时，使用小屏视觉布局；窗口宽度 > 1205时，使用大屏视觉布局。

## 实现要求
### 效果要求
正确还原视觉效果，正确测量大小宽高距离位置等数值，文字边框背景等颜色能正确取色。

### 功能要求
按照效果图和上面功能点完成所有功能（可以不考虑跨域问题）。

### 兼容性要求
页面兼容 IE8+、FF、Chrome，允许圆角、阴影只在高版本浏览器中实现。

### HTML 要求
完善的头部信息，代码缩进，正确使用语义化标签及实体，考虑 SEO 需要，正确嵌套标签，正确使用标签属性，规范的注释格式。

### CSS 要求
CSS 文件内部规范化分类，命名和格式规范化，注释清晰，合理化代码。

### JS 要求
* 本作业要求不使用任何的 JS 框架
* JS 代码要求命名有统一的命名规范
* JS 代码要求整洁、紧凑、可读性好
* JS 代码要求注释完整

### 其它要求
代码简洁性、通用性、扩展性、可读性、可维护性。

## CSS命名规范
CSS 命名模块化，全部采用小写，如：

```css
/* 模态框 */
.m-modal .bg{ position:fixed; top:0; left:0; right:0; bottom:0; background:rgba(0, 0, 0, 0.8); z-index:998; }
.m-modal .modal_wrap{ position:fixed; background:#fff; z-index:999; }
.m-modal .modal_close{ position:absolute; top:10px; right:10px; width:10px; height:10px; background:url('../imgs/sprite.png') no-repeat -18px -10px; cursor:pointer; }
.m-modal .modal_head{ padding:30px 50px 20px 40px; line-height:18px; font-size:18px; font-weight:bold; cursor:move; }
.m-modal .modal_group{ position:relative; margin:0 50px 15px 40px; }
.m-modal .modal_label{ position:absolute; top:12px; left:12px; color:#ccc; }
.m-modal .modal_input{ width:269px; padding:13px 12px; border:1px solid #dfdfdf; background:#fafafa; box-shadow:1px 1px 1px 1px #f1f1f1 inset; }
.m-modal .modal_submit{ width:295px; height:46px; margin:0 0 40px 40px; line-height:46px; border:0; background:#20a942; text-align:center; box-shadow:2px 2px 1px 1px #d5e3da; font-size:16px;  font-weight:bold; color:#fff;}
.m-modal .modal_video{ margin:0 30px 40px 30px; }
```

## 图片优化
采用 sprite 技术优化图片资源。

![sprite](imgs/sprite.png)

## JS 代码优化

1. 使用命名空间实现模块化，好处是结构化、访问权限得到控制、不污染全局，声明依赖。
2. 功能组件化，相同功能抽象成类，定义公共接口，暴露事件。好处是逻辑性强（结构、样式、行为）、可复用。

```javascript
!function(util) {

  function Carousel(opt) {
    if(!(this instanceof Carousel)) return new Carousel(opt);
  }

  // 暴露 API
  if (typeof exports === 'object') {
    module.exports = Carousel;
  } else if (typeof define === 'function' && define.amd) {
    // 支持amd
    define(function() {
      return Carousel;
    });
  } else {
    window.Carousel = Carousel;
  }

}(util);
```

## 说明
经过三个多月的课程学习，结合平时的知识积累，完成了期末大作业并取得了优异的成绩，总算是这段时间的辛苦付出没有白费。我知道这仅仅是一个开始，前端的路是先平稳后曲折，在前端领域技术更新日新月异的今天，唯有掌握好基础知识，加强独立思考的能力，才不会随波逐流。让我们一起探索前端奇妙之旅吧^_^。

学习笔记：https://dancdw.gitbooks.io/netease-front-end/content/

证书地址：http://study.163.com/cert/Authority.htm?certNo=M2016100000109

演示页面：https://dancdw.github.io/netease-front-end/