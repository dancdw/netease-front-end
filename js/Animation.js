!function() {

  // 取整函数
  var calcMath = function(distance, dirction) {
    return dirction === 1 ? Math.ceil(distance) : Math.floor(distance);
  }

  // 正负方向
  var calcDirction = function(start, end) {
    return (end - start) / Math.abs(end - start);
  }

  // 计算当前值
  var calcCurrVal = function(elem, property) {
    var curr = parseFloat(elem.style[property]);
    if(property === 'opacity') curr = Math.round(curr * 100);
    return curr;
  }

  // 设置移动后的值
  var setVal = function(elem, property, dis) {
    if(property === 'opacity') {
      elem.style['filter'] = 'alpha(opacity=' + dis + ')';
      dis = dis / 100;
      
      elem.style[property] = dis;
      elem.style['-moz-' + property] = dis;
      elem.style['-khtml-' + property] = dis;
    } else {
      elem.style[property] = dis + 'px';
    }
  }

  function Animation() {
    if(!(this instanceof Animation)) return;
  }

  Animation.prototype = {
    // 执行动画
    animate: function(elem, property, start, end, second, speed, fn) {
      var self = this,
          second = second ? second : 10,
          speed = speed ? speed : 10,
          dirction = calcDirction(start, end), // 正负方向
          end = property === 'opacity' ? end * 100 : end;

      elem.style[property] = start ? start : 0; // 元素初始化
      clearInterval(this['timer_' + property]);
      
      this['timer_' + property] = setInterval(function(){
        var curr = calcCurrVal(elem, property), // 当前值
            step = calcMath((end - curr) / speed, dirction); // 步长 = 目标距离 / 速度
        
        if(end === curr) {
          clearInterval(self['timer_' + property]);
          fn && fn();
        } else {
          setVal(elem, property, curr + step);
        }
      }, second);
    },
  }

  
  // 暴露 API
  if (typeof exports === 'object') {
    module.exports = Animation;
  } else if (typeof define === 'function' && define.amd) {
    // 支持amd
    define(function() {
      return Animation;
    });
  } else {
    window.Animation = Animation;
  }
}();