var util = (function() {
  
  // IE9以下 bind 兼容 
  if (!Function.prototype.bind) {
    Function.prototype.bind = function (oThis) {
      if (typeof this !== "function") {
        throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
      }

      var aArgs = Array.prototype.slice.call(arguments, 1),
          fToBind = this,
          fNOP = function () {},
          fBound = function () {
            return fToBind.apply(this instanceof fNOP ? this : oThis || this,
              aArgs.concat(Array.prototype.slice.call(arguments)));
          };

      fNOP.prototype = this.prototype;
      fBound.prototype = new fNOP();

      return fBound;
    };
  }
  
  return {

    // 获取屏幕尺寸
    getWinSize: function() {
      //获取窗口宽度
      if (window.innerWidth)
        winWidth = window.innerWidth;
      else if ((document.body) && (document.body.clientWidth))
        winWidth = document.body.clientWidth;
      // 获取窗口高度
      if (window.innerHeight)
        winHeight = window.innerHeight;
      else if ((document.body) && (document.body.clientHeight))
        winHeight = document.body.clientHeight;
      // 通过深入 Document 内部对 body 进行检测，获取窗口大小
      if (document.documentElement && document.documentElement.clientHeight && document.documentElement.clientWidth)
      {
        winHeight = document.documentElement.clientHeight;
        winWidth = document.documentElement.clientWidth;
      }
      return {winWidth: winWidth, winHeight: winHeight}
    },

    // 获取滚动条的宽
    getScrollbarWidth: function() {
      var oP = document.createElement('p'),
          styles = {
              width: '100px',
              height: '100px',
              overflowY: 'scroll'
          }, i, scrollbarWidth;
      for (i in styles) oP.style[i] = styles[i];
      document.body.appendChild(oP);
      scrollbarWidth = oP.offsetWidth - oP.clientWidth;
      oP.remove();
      return scrollbarWidth;
    },

    // 模板替换
    easyTpl: function(tpl, data) {
        var reg = /{\$([a-zA-Z$_][a-zA-Z$_0-9\.]*)}/g;

        return tpl.replace(reg, function(raw, key, index, str) {
          var paths = key.split('.'),
              lookup = data;
          while(paths.length > 0) {
              lookup = lookup[paths.shift()];
          }
          return lookup || raw;    
        });
    },


    // IE9以下 dataset 兼容
    getDataset: function(el) {
      if(el.dataset) {
        return el.dataset;
      } else {
        el.dataset = {};
        for(var i = 0, len = el.attributes.length; i < len; i++) {
          var key = el.attributes[i].nodeName.match(/^data-([^-]+)-?([^-]+)?/i);
          if(!!key) {
            var property = !key[2] ? key[1] : key[1] + key[2].replace(/(\w)/, function(n) { return n.toUpperCase();});
            el.dataset[property] = el.attributes[i].value;
          }
        }
        return el.dataset;
      }
    },

    // 判断是否为空
    isEmpty: function(val) {
      val = val.replace(/(^\s*)|(\s*$)/g, '');
      return val.length === 0 ? true : false;
    },

    // IE9以下 children 兼容
    getChildren: function(el) {
      if(el.children) {
        return el.children;
      } else {
        var els = el.childNodes,
            arr = [];
        for(var i = 0; i < els.length; i++) {
            if(els[i].nodeType == 1 ) {
                arr.push(els[i]);
            }
        }
        return arr;
      }
    },

    // IE9以下 getElementsByClassName() 兼容
    // getElementsByClassName: function(el, names) {
    //   if(el.getElementsByClassName) { // 特征侦测，符合W3C规范
    //     return el.getElementsByClassName(names);
    //   } else {
    //     var els = el.getElementsByTagName('*'),
    //         namesArr = names.split(" "),
    //         res = [],
    //         flag,
    //         elemClassName;
    //     for(var i = 0; i < els.length; i++) {
    //       elemClassName = " " + els[i].className + " "; // 获取当前元素 class 属性
    //       flag = true;
    //       for(var j = 0; j < namesArr.length; j++) {
    //           if(elemClassName.indexOf(" " + namesArr[j] + " ") == -1) { 
    //               // 未找到包含 className
    //               flag = false;
    //               break;
    //           }
    //       }
    //       if(flag) {
    //           res.push(els[i]);
    //       }
    //     }
    //     return res;
    //   }
    // },

    getElementsByClassName: function(el, names) {
      var els = el.getElementsByTagName('*'),
          namesArr = names.split(" "),
          res = [],
          flag,
          elemClassName;
      for(var i = 0; i < els.length; i++) {
        elemClassName = " " + els[i].className + " "; // 获取当前元素 class 属性
        flag = true;
        for(var j = 0; j < namesArr.length; j++) {
            if(elemClassName.indexOf(" " + namesArr[j] + " ") == -1) { 
                // 未找到包含 className
                flag = false;
                break;
            }
        }
        if(flag) {
            res.push(els[i]);
        }
      }
      return res;
    },

    // 判断是否是一个空对象
    isEmptyObj: function(obj) {
      for (var i in obj) {
        return 0;
      }
      return 1;
    },

    // 对象属性拷贝
    extend: function(toObj, frommObj, deep) {
      for (var k in frommObj) {
        if (!toObj.hasOwnProperty(k))
          if (deep == true) { // 深拷贝
            toObj[k] = (typeof frommObj[k] == 'object' && frommObj[k] !== null) ? arguments.callee({}, frommObj[k], deep) : (frommObj[k] ? frommObj[k] : '');
          } else { // 浅拷贝
            toObj[k] = frommObj[k] ? frommObj[k] : '';
          }
      }
      return toObj;
    },

    // 将HTML转换为节点
    html2node: function(str){
      var div = document.createElement('div');
      div.innerHTML = str;
      return div.children[0];
    },

    // 注册事件
    addEvent: function(obj, type, fn, capture) {
      if (window.addEventListener) {
        obj.addEventListener(type, fn, capture);
      } else {
        obj.attachEvent('on' + type, fn);
      }
    },

    // 取消事件注册
    delEvent: function(obj, type, fn, capture) {
      if (window.removeEventListener) {
        obj.removeEventListener(type, fn, capture);
      } else {
        obj.detachEvent('on' + type, fn);
      }
    },
    
    // 查看 class 是否存在
    hasClass: hasClass,

    // 移除节点class
    delClass: function(elem, classn) {
      if(hasClass(elem, classn)) if(!elem.className.charAt(0)) {
        elem.className = elem.className.replace(' ' + classn, '');
      } else {
        elem.className = elem.className.replace(classn, '');
      }
    },

    // 添加节点class
    addClass: function(elem, classn) {
      if(!hasClass(elem, classn)) if(!elem.className.charAt(0)) {
        elem.className = classn;
      } else {
        elem.className += ' ' + classn;
      }
    },

    // 获取元素真实样式
    getStyle: getStyle,

    // 获取元素真实样式（转换为数值）
    getStyleFloat: function(elem, attr) {
      return parseFloat(getStyle(elem, attr));
    },

    // 根据 id 获取DOM
    $: function(id) {
      return document.getElementById(id);
    },
  }


  // 获取样式
  function getStyle(elem, attr) {
    if (elem.currentStyle) {
      return elem.currentStyle[attr];
    } else {
      return window.getComputedStyle(elem)[attr];
    }
  }

  // 查看 class 是否存在
  function hasClass(elem, classn) {
    var res = (elem.className += ' ').indexOf(' ' + classn + ' ');
    return res === -1 ? 0 : 1; 
  }
})();