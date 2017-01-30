!function(util, animation, emitter) {
  var extend = util.extend,
      html2node = util.html2node,
      getElementsByClassName = util.getElementsByClassName,
      getStyleFloat = util.getStyleFloat,
      beltTpl = '<div class="belt"></div>',
      hasClass = util.hasClass,
      addClass = util.addClass,
      addEvent = util.addEvent,
      carousels = {};


  // 工厂单例
  // function CarouselFactory(opt) {
  //   var name = opt.container.id;
  //   if(!carousels.hasOwnProperty(name)) {
  //     carousels[name] = new Carousel(opt);
  //   } 
  //   return carousels[name];
  // }


  function Carousel(opt) {
    if(!(this instanceof Carousel)) return new Carousel(opt);
    extend(this, opt);

    this.currIndex = 1;
    this.pageIndex = -1;
    this.offsetAll = this.pageIndex;
    this.pageNum = this.data.length;

    // 获取相关节点
    this.belt = this._layout();
    this.beltItems = getElementsByClassName(this.belt, 'belt-item');

    this.container.appendChild(this.belt);

    this._bind();
  }

  extend(Carousel.prototype, animation);

  extend(Carousel.prototype, emitter);

  extend(Carousel.prototype, {

    // 绑定事件
    _bind: function() {
      var self = this;
      [].forEach.call(this.beltItems, function(item) {
        addEvent(item, 'mouseover', function() {
          self.clear();
        });

        addEvent(item, 'mouseout', function() {
          self.isTimeout && self.run(this.timeout);
        });
      });
    },

    // 标准化下标
    _normIndex: function(index, len) {
      return (len + index) % len;
    },

    // 生成传送带
    _layout: function() {
      var beltItemNum = this.beltItemNum ? this.beltItemNum : 1,
          belt = html2node(beltTpl),
          item = html2node('<div class="belt-item">' + this.tpl + '</div>');
      for(var i = 0; i < beltItemNum; i++) {
        belt.appendChild(item.cloneNode(true));
      }
      return belt;
    },

    // 处理位移
    _start: function() {
      var width = this.offset,
          currIndex = this.currIndex = this._normIndex(this.currIndex, this.beltItemNum),
          pageIndex = this.pageIndex = this._normIndex(this.pageIndex, this.beltItemNum),
          property = this.property,
          offsetAll = this.offsetAll,
          second = this.second ? this.second : 10, // 每帧动画时间
          speed = this.speed ? this.speed : 10, // 每帧动画速度
          callback = this.callback ? this.callback : function(){}; // 动画异步回调

      // 每项位移
      for(var i = -1; i < this.beltItemNum - 1; i++) {
        var index = this._normIndex(currIndex + i, this.beltItemNum);
        this.beltItems[index]['style'][property] = (offsetAll + i) * width + 'px';
      }

      // 执行动画
      this.animate(this.belt, property, getStyleFloat(this.belt, property), +( -offsetAll * width ), second, speed, callback);

      this._onNav(pageIndex, currIndex);
    },

    // 更新数据
    _onNav: function(pageIndex, currIndex){
      for(var i = -1; i < this.beltItemNum - 1; i++) {
        var index = this._normIndex(currIndex + i, this.beltItemNum),
            dataIndex = this._normIndex(pageIndex + i, this.pageNum);
        for(var j = 0; j < this.parameter.length; j++) {
          var className = this.parameter[j]['className'],
              item = this.beltItems[index],
              attr = this.parameter[j]['attr'],
              dataItem = this.data[dataIndex],
              dataName = this.parameter[j]['dataName'],
              elem = getElementsByClassName(item, className)[0];

          elem[attr] = dataItem[dataName];
        }
      }
      
      // 执行事件
      this.emit('nav', {pageIndex: pageIndex, beltItems: this.beltItems, lastIndex: this.lastIndex});
    },

    // 下一页
    next: function() {
      this._step(1);
    },

    // 上一页
    prev: function() {
      this._step(-1);
    },

    // 单步执行
    _step: function(offset) {
      this.lastIndex = this.pageIndex;
      this.currIndex += offset;
      this.pageIndex += offset;
      this.offsetAll += offset;

      this._start();
    },

    // 跳转到指定页
    nav: function(index) {
      this.lastIndex = this.pageIndex;
      this.pageIndex = index;
      this.offsetAll = index;
      this.currIndex = index + 1;

      this._start();

      this.isTimeout && this.run(this.timeout);
    },

    // 自动执行轮播
    run: function(timeout) {
      var self = this;
      this.timeout = this.timeout ? this.timeout : timeout ? timeout : 3000;
      this.isTimeout = true;

      this.clear();
      this.timer = setInterval(function() {
        self.next();
      }, this.timeout);

      return this;
    },

    // 停止轮播
    clear: function() {
      clearInterval(this.timer);
    }
  });


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
}(util, animation, emitter);