!function(util, LoginModal, cookie, ajax){
  var $ = util.$,
      addEvent = util.addEvent,
      extend = util.extend,
      addClass = util.addClass,
      delClass = util.delClass,
      url = 'http://study.163.com/webDev';

  // 关注成功状态
  var followSucState = function() {
    addClass(follow, 'f-dn');
    delClass(hasfollow, 'f-dn');
  }

  // 未关注状态
  var cancelState = function() {
    delClass(follow, 'f-dn');
    addClass(hasfollow, 'f-dn');
  }

  // 关注接口
  var ajaxFollow = function() {
    if(!cookie.getItem('followSuc')) {
      ajax.request({
        url: url + '/attention.htm',
        async: true,
        method: 'get',
        success: function(xhr){
          if(xhr.responseText == 1) {
            cookie.setItem('followSuc', true);
            followSucState();
          }
        },
        error: function(xhr) {
          console.error('Request was unsuccessful: ' + xhr.status);
        }
      });
    }
  }


  function Follow() {
    if(!(this instanceof Follow)) return new Follow;

  }

  extend(Follow.prototype, {
    init: function() {
      // 是否已关注
      if(cookie.getItem('followSuc')){
        followSucState();
      } else {

        // 绑定事件
        this._bind();
      }
    },

    _bind: function() {
      
      var loginModal = LoginModal(); // 登录模态组件

      // 取消关注按钮
      addEvent($('j-cancel'), 'click', function() {
        if(cookie.getItem('followSuc')){
          cookie.delItem('followSuc');
          cancelState();
        }
      });

      // 关注按钮
      addEvent($('j-follow'), 'click', function() {

        // 是否登录
        if(!cookie.getItem('loginSuc')){

          // 显示登录模态组件
          loginModal.show('登录网易云课堂');

        } else {
          ajaxFollow();
        }
      });

      // 订阅提交事件
      loginModal.on('submit', function(ev) {
        var userVal = ev.user.value,
            pwdVal = ev.pwd.value;

        // 表单验证，并返回第一条错误信息
        var res = loginModal.addValidation([
          {name: 'user', rule: 'required', msg: '请输入账号'},
          {name: 'user', rule: 'minlength', ruleExt: 3, msg: '账号长度必须大于3位'},
          {name: 'pwd', rule: 'required', msg: '请输入密码'},
          {name: 'pwd', rule: 'minlength', ruleExt: 6, msg: '密码长度必须大于6位'},
          {name: 'pwd', rule: 'regexp', ruleExt: '/^(?![0-9]+$)(?![a-zA-Z]+$).{6,}$/', msg: '密码必须包含数字和字母'},
        ]).checkValidation().showErrorSingle();
        
        if(res) {
          alert(res['msg']);
          return;
        }

        // 登录接口
        ajax.request({
          url: url + '/login.htm',
          method: 'get',
          data: { userName: md5(userVal), password: md5(pwdVal) },
          success: function(xhr){
            if(xhr.responseText == 1) {

              cookie.setItem('loginSuc', true);

              // 关注接口
              ajaxFollow();

              // 销毁登录窗口
              loginModal.destroy();

            } else {
              alert('您输入的帐号或密码有误');
            }
          },
          error: function(xhr) {
            console.error('Request was unsuccessful: ' + xhr.status);
          }
        });

      });
    }
    
  });

  // 暴露 API
  if (typeof exports === 'object') {
    module.exports = Follow;
  } else if (typeof define === 'function' && define.amd) {
    // 支持amd
    define(function() {
      return Follow;
    });
  } else {
    window.Follow = Follow;
  }
}(util, LoginModal, cookie, ajax);