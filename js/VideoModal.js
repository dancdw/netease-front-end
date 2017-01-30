!function(Modal, util) {
  var videos = {},
      easyTpl = util.easyTpl,
      extend = util.extend,
      addEvent = util.addEvent,
      getElementsByClassName = util.getElementsByClassName,
      delClass = util.delClass,
      addClass = util.addClass,
      tpl = '<video class="modal_video" controls="" poster="{$imgUrl}" src="{$url}" width="{$width}" height="{$height}"></video>';
  
  // 工厂单例
  // function VideoFactory(opt) {
  //   var name = opt.container.id;
  //   if(!carousels.hasOwnProperty(name)) {
  //     videos[name] = new Video(opt);
  //   } 
  //   return videos[name];
  // }

  function VideoModal(opt) {
    if(!(this instanceof VideoModal)) return new VideoModal(opt);
    extend(this, opt);

    this.container = this.container ? this.container : document.body;
    this.width = this.width ? this.width : 889;
    this.height = this.height ? this.height : 567;

    this.modal = this.createModal({tpl: easyTpl(tpl, this)});
    this.modal_close = getElementsByClassName(this.modal, 'modal_close')[0];
    this.modal_video = getElementsByClassName(this.modal, 'modal_video')[0];

    document.body.appendChild(this.modal);

    this._bind();
  }

  extend(VideoModal.prototype, Modal.prototype);

  extend(VideoModal.prototype, {
    _bind: function() {
      addEvent(this.container, 'click', this.shwoTime.bind(this));

      addEvent(this.modal_close, 'click', this.hide.bind(this));
    },

    shwoTime: function() {
      this.show('请观看下面的视频');
    },

    hide: function() {
      this.modal_video.pause();
    },
  });


  // 暴露 API
  if (typeof exports === 'object') {
    module.exports = VideoModal;
  } else if (typeof define === 'function' && define.amd) {
    // 支持amd
    define(function() {
      return VideoModal;
    });
  } else {
    window.VideoModal = VideoModal;
  }
}(Modal, util);