!function(util, cookie){
  var html2node = util.html2node,
      addEvent = util.addEvent,
      getElementsByClassName = util.getElementsByClassName,
      $ = util.$,
      tpl = '<div id="j-topnotice" class="m-topad">\
      <div class="wrap f-cb">\
        <p class="f-fl">网易云课堂微专业，帮助你掌握专业技能，令你求职或加薪多一份独特优势！</p><a  class="f-fl check" href="javascript:void(0);">立即查看 ></a><a id="j-topnotice-close" class="f-fr colse" href="javascript:void(0);">不再提示</a>\
      </div>\
    </div>';


  function Notice() {
    if(!(this instanceof Notice)) return new Notice;
  }

  Notice.prototype = {
    
    init: function() {
      if(!cookie.getItem('topnotice-close')){
        var self = this;
        this.notificationBar = html2node(tpl);
        this.topNoticeClose = getElementsByClassName(this.notificationBar, 'colse')[0];
        addEvent(this.topNoticeClose, 'click', function() {
          cookie.setItem('topnotice-close', true);
          self._destroy();
        });

        this._show();
      }
    },

    // 显示通知条
    _show: function() {
      document.body.insertBefore(this.notificationBar, document.body.firstChild);
    },

    // 销毁通知条
    _destroy: function() {
      document.body.removeChild(this.notificationBar);
    }
  }

  // 暴露 API
  if (typeof exports === 'object') {
    module.exports = Notice;
  } else if (typeof define === 'function' && define.amd) {
    // 支持amd
    define(function() {
      return Notice;
    });
  } else {
    window.Notice = Notice;
  }
}(util, cookie);