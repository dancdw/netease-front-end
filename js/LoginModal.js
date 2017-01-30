!function(util, emitter, Validator, Modal) {
  var $ = util.$,
  	  doc = document,
  	  getElementsByClassName = util.getElementsByClassName,
      extend = util.extend,
  	  addClass = util.addClass,
  	  delClass = util.delClass,
  	  addEvent = util.addEvent,
      html2node = util.html2node,
      easyTpl = util.easyTpl,
  	  isMove = 0,
      inputTpl = '<div class="modal_group"><label for="j-{$name}" class="modal_label">{$label}</label><input type="{$type}" name="{$name}" id="j-{$name}" class="modal_input"></div>';

  function LoginModal(opt) {
    if(!(this instanceof LoginModal)) return new LoginModal(opt);
    
    extend(this, opt);

    this.form = this.form ? this.form : {name:'loginForm'};
    this.username = this.username ? this.username : {label: '账号', name:'user', type:'text'};
    this.password = this.password ? this.password : {label: '密码', name:'pwd', type:'password'};

    // 创建表单模板
    var tpl = this._createTpl();

  	// 生成模态
  	this.modal = this.createModal({tpl: tpl});
	
	  doc.body.appendChild(this.modal);

  	// 获取节点后续绑定事件
  	this.form = getElementsByClassName(this.modal, 'modal_form')[0];
    this.modal_wrap = getElementsByClassName(this.modal, 'modal_wrap')[0];
    this.head = getElementsByClassName(this.modal, 'modal_head')[0];
    this.submit = getElementsByClassName(this.modal, 'modal_submit')[0];
    this.user = $('j-' + this.username.name);
    this.pwd = $('j-' + this.password.name);
    this.inputGroup = getElementsByClassName(this.modal, 'modal_input');

    // 用于识别字段
    this.setForm(this.form);

  	this._bind();

    // 清除浏览器提示缓存
    this._checkPrompt([this.pwd, this.user]);
  }

  extend(LoginModal.prototype, emitter);

  extend(LoginModal.prototype, Validator.prototype);

  extend(LoginModal.prototype, Modal.prototype);

  extend(LoginModal.prototype, {

    // 创建表单模板
    _createTpl: function() {
      var html = '<form name="' + this.form.name + '" id="j-' + this.form.name + '" class="modal_form">';
      html += easyTpl(inputTpl, this.username);
      html += easyTpl(inputTpl, this.password);
      html += '<button class="modal_submit" id="j-submit" type="button">登 录</button></form>';
      return html;
    },

    // 清除浏览器提示缓存
    _checkPrompt: function(arr) {
      for(var i in arr) {
        this._hidePrompt(arr[i]);
        this._showPrompt(arr[i]);
      }
    },

  	// 销毁节点
  	destroy: function() {
      doc.body.removeChild(this.modal);
  	},

  	// 隐藏提示
  	_hidePrompt: function(input) {
  	  addClass(input.previousSibling, 'f-dn');
  	},

  	// 显示提示
  	_showPrompt: function(input){
  	  if(input.value === '') delClass(input.previousSibling, 'f-dn');
  	},

  	// 登录事件
  	_checkLogin: function() {
  	  this.emit('submit', {
        user: this.user,
        pwd: this.pwd
      });
  	},
  	
    // 绑定事件
  	_bind: function() {
      var self = this;

  	  // 提示信息
  	  [].forEach.call(this.inputGroup, function(item) {
  	  	addEvent(item, 'focus', self._hidePrompt.bind(self, item));
  	  	addEvent(item, 'blur', self._showPrompt.bind(self, item));
  	  });

  	  // 登录
  	  addEvent(this.submit, 'click', this._checkLogin.bind(this));

      // Enter键
      addEvent(this.modal, 'keyup', function(e) {
        var e = e || window.event,
            target = e.target;

        if(e.keyCode === 13){
          if(target.id === 'j-user'){
            self._showPrompt(target);
            $('j-pwd').focus();
          } else if(target.id === 'j-pwd') {
            self._checkLogin(self);
          }
        }
      });

      // 恢复光标正确位置
      addEvent(this.pwd, 'focus', function(e) {
        var e = e || window.event,
            target = e.target;

        target.selectionEnd = target.value.length;
      });
  	}
  });

  

  // 暴露 API
  if (typeof exports === 'object') {
    module.exports = LoginModal;
  } else if (typeof define === 'function' && define.amd) {
    // 支持amd
    define(function() {
      return LoginModal;
    });
  } else {
    window.LoginModal = LoginModal;
  }

}(util, emitter, Validator, Modal);