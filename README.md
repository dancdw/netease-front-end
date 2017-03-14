## 如何开始

1. 安装 [NodeJS](https://nodejs.org/en/ "NodeJS官网")
2. `npm install -g gulp`
3. `npm install`
4. `gulp or gulp server`

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
├─dist
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

**dist**
存放部署环境的文件目录。

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
经过三个多月的课程学习，最终完成了期末大作业并取得了不错的成绩，总算是这段时间的辛苦付出没有白费。我知道这仅仅是一个开始，前端的路是先平稳后曲折，在前端领域技术更新日新月异的今天，唯有掌握好基础知识，加强独立思考的能力，才不会随波逐流。让我们一起探索前端奇妙之旅吧^_^。

学习笔记：https://dancdw.gitbooks.io/netease-front-end/content/

证书地址：http://study.163.com/cert/Authority.htm?certNo=M2016100000109

演示页面：https://dancdw.github.io/netease-front-end/dist