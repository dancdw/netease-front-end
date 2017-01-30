!function(util, ajax, page) {
  var extend = util.extend,
  	  html2node = util.html2node,
  	  easyTpl = util.easyTpl,
  	  getElementsByClassName = util.getElementsByClassName,
  	  addEvent = util.addEvent,
  	  addClass = util.addClass,
  	  delClass = util.delClass,
  	  hasClass = util.hasClass,
  	  getDataset = util.getDataset,
      getScrollbarWidth = util.getScrollbarWidth,
      isTimeout = -1,
  	  tpl = '<div class="item">\
              <div class="profiles">\
                <img src="{$middlePhotoUrl}" />\
                <p class="f-ellipsis">{$name}</p>\
                <span>{$provider}</span>\
                <i class="m-profile">{$learnerCount}</i>\
                <strong>{$price}</strong>\
              </div>\
              <div class="details f-dn">\
                <div class="sketch f-cb">\
                  <div class="f-fl"><img src="{$middlePhotoUrl}" /></div>\
                  <div class="f-fl"><h5 class="f-ellipsis">{$name}</h5>\
                  <i class="m-profile">{$learnerCount}人在学</i>\
                  <p class="provider">发布人：{$provider}</p>\
                  <p class="category">分类：{$categoryName}</p>\</div>\
                </div>\
                <p class="description">{$description}</p>\
              </div>\
            </div>';

  var getPsize = function() {
    return document.documentElement.clientWidth + getScrollbarWidth() >= 1205 ? 20 : 15;
  }
  
  function CourseFactory(opt) {
  	var container = opt.container;
  	// 防止重复调用
  	if(hasClass(container, 'course-container')) return;

  	addClass(container, 'course-container');
  	return new Course(opt);
  }

  function Course(opt) {
  	extend(this, opt);

  	this.type = this.type ? this.type : 10;
    this.pageNo = this.pageNo ? this.pageNo : 1;
    this.responseData = {}; // 存放缓存数据

  	this._sendAjax();
  }
  
  extend(Course.prototype, ajax);

  extend(Course.prototype, page);

  extend(Course.prototype, {

    // 生成课程内容
    _layout: function() {
      var html = '<div class="content f-cb">';
      this['responseData'][this.pageName]['list'].forEach(function(item) {
      	var obj = extend({}, item); // 对象拷贝
      	obj.categoryName = obj.categoryName ? obj.categoryName : '暂无';
        obj.price = obj.price ? '￥' + obj.price : '免费';
      	html += easyTpl(tpl, obj);
      });
      html += '</div>';
      return html2node(html);
    },

    // 回调处理
    _callback: function() {
      // 清空原有内容
      this.container.innerHTML = '';

      // 生成课程内容节点
      this.courses = this._layout();

      // 生成分页器节点
      this.pageContainer = this.renderPage(this['responseData'][this.pageName]['totalPage'], this.pageNo);

      this.items = [].slice.call(getElementsByClassName(this.courses, 'item'));
      this.pageItems = [].slice.call(getElementsByClassName(this.pageContainer, 'item'));

      this._bind();

      this.container.appendChild(this.courses);
      this.container.appendChild(this.pageContainer);
    },

    // 绑定事件
    _bind: function() {
      var self = this;

      // 是否显示详情
      this.items.forEach(function(item) {
      	var details = getElementsByClassName(item, 'details')[0],
      		  profiles = getElementsByClassName(item, 'profiles')[0];

      	addEvent(item, 'mouseenter', self._showDetails.bind(self, profiles, details));

      	addEvent(item, 'mouseleave', self._hideDetails.bind(self, details));
      });

      // 分页更新数据
      this.pageItems.forEach(function(item) {
      	var dataset = getDataset(item);
      	addEvent(item, 'click', self._sendAjax.bind(self, dataset.pageno));
      });

      // 页面缩放事件
      addEvent(window, 'resize', function() {
        clearTimeout(this['timerId']);
        this['timerId'] = setTimeout(function() {
          self._reRequest();
        }, 500);
      });
    },

    // 重新请求数据
    _reRequest: function() {
      this._sendAjax(this.pageNo);
    },

    // 显示详情
    _showDetails: function(profiles, details) {
      var offsetLeft = parseFloat(profiles.offsetLeft),
      	  offsetTop = parseFloat(profiles.offsetTop);
      
      details.style.left = offsetLeft - 9 + 'px';
      details.style.top = offsetTop - 9 + 'px';

      isTimeout = setTimeout(function() {
        addClass(details, 'z-active');
      }, 500);
    },

    // 隐藏详情
    _hideDetails: function(details) {
      delClass(details, 'z-active');
      clearTimeout(isTimeout);
    },

    // 发送ajax请求
    _sendAjax: function(pageNo) {
      var self = this;
      
      this.pageNo = pageNo ? pageNo : 1;
      this.psize = getPsize();
      this.pageName = this._getPageName();

      if(!this['responseData'].hasOwnProperty(this.pageName)) {
      	this.request({
    		  url: 'http://study.163.com/webDev/couresByCategory.htm',
    		  method: 'get',
    		  data: { pageNo:this.pageNo, psize:this.psize, type:this.type },
    		  success: function(xhr){
    	      self['responseData'][self.pageName] = JSON.parse(xhr.responseText);

    		    self._callback();
    		  },
    		  error: function(xhr) {
    		    console.error('Request was unsuccessful: ' + xhr.status);
    		  }
    		});
      } else {
      	this._callback();
      }
    },

    // 获取分页名称
    _getPageName: function() {
      return 'page' + '_' + getPsize() + '_' + this.pageNo;
    },

  });

  // 暴露 API
  if (typeof exports === 'object') {
    module.exports = CourseFactory;
  } else if (typeof define === 'function' && define.amd) {
    // 支持amd
    define(function() {
      return CourseFactory;
    });
  } else {
    window.CourseFactory = CourseFactory;
  }
}(util, ajax, page);