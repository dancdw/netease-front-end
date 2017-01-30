!function(util) {
  var extend = util.extend,
  	  addClass = util.addClass,
  	  delClass = util.delClass,
  	  getDataset = util.getDataset,
      addEvent = util.addEvent;
      
  function TagCenter(opt) {
  	if(!(this instanceof TagCenter)) return new TagCenter(opt);

  	extend(this, opt);

  	this._bind();
  	
  	this.callback && this.callback(0, getDataset(this.tags[0]));
  }

  extend(TagCenter.prototype, {
  	// 为每个tag 绑定事件
  	_bind: function() {
  	  var self = this,
          tags = this.tags;
          
  	  tags.forEach(function(item, ikey) {
  	  	addEvent(item, 'click', function() {
  	  	  // tag 效果切换
  	  	  tags.forEach(function(tag, tkey) {
  	  	  	if(ikey === tkey) {
  	  	  	  addClass(tags[tkey], 'active');
  	  	  	  self.callback(tkey, getDataset(tags[tkey]));
  	  	  	} else {
  	  	  	  delClass(tags[tkey], 'active');
  	  	  	}
  	  	  });
	      });
  	  });
  	},
  });


  // 暴露 API
  if (typeof exports === 'object') {
    module.exports = TagCenter;
  } else if (typeof define === 'function' && define.amd) {
    // 支持amd
    define(function() {
      return TagCenter;
    });
  } else {
    window.TagCenter = TagCenter;
  }
}(util);