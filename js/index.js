(function(util, cookie, LoginModal, ajax, md5, Carousel, Animation, TagCenter, CourseFactory, VideoModal) {
  var $ = util.$,
      addEvent = util.addEvent,
      addClass = util.addClass,
      delClass = util.delClass,
      getElementsByClassName = util.getElementsByClassName,
      url = 'http://study.163.com/webDev',
      follow = $('j-follow'),
      hasfollow = $('j-hasfollow'),
      topnotice = $('j-topnotice'),
      md5 = md5.md5,
      getStyleNum = util.getStyleNum,
      getChildren = util.getChildren,
      navs = [].slice.call(getElementsByClassName($('j-carousel-full'), 'cursor')),
      courses = [].slice.call(getElementsByClassName($('j-courses'), 'course')),
      loginModal = new LoginModal();

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

  // 是否关注
  if(cookie.getItem('followSuc')){
    followSucState();
  }

  // 隐藏通知条
  if(!cookie.getItem('topnotice-close')){
    addEvent($('j-topnotice-close'), 'click', function() {
      cookie.setItem('topnotice-close', true);
      addClass(topnotice, 'f-dn');
    });
  } else {
    addClass(topnotice, 'f-dn');
  }

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
      loginModal.show('登录网易云课堂');
    } else {
      ajaxFollow();
    }
  });

  // 表单提交事件
  loginModal.on('submit', function(ev) {
    var userVal = ev.user.value,
        pwdVal = ev.pwd.value;

    // 表单验证，并返回第一条错误信息
    var res = loginModal.addValidation([
      {name: 'user', rule: 'required', msg: '请输入账号'},
      {name: 'user', rule: 'minlength', ruleExt: 3, msg: '账号必须大于3位'},
      {name: 'pwd', rule: 'required', msg: '请输入密码'},
      {name: 'pwd', rule: 'minlength', ruleExt: 6, msg: '密码必须大于6位'},
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


  // 为按钮添加切换轮banner
  navs.forEach(function(item, key) {
    addEvent(item, 'click', function() {
      carousel.nav(key);
    });
  });

  // banner轮播
  var carousel = new Carousel({
    container: $('j-carousel'),
    tpl: '<a class="item-url" target="_blank" ><img class="item-img"/></a>',
    data: [
      {src: 'imgs/banner0.jpg', url: 'http://open.163.com/'},
      {src: 'imgs/banner1.jpg', url: 'http://study.163.com/'},
      {src: 'imgs/banner2.jpg', url: 'http://www.icourse163.org/'},
    ],
    parameter: [
      {className: 'item-img', attr: 'src', dataName: 'src'},
      {className: 'item-url', attr: 'href', dataName: 'url'},
    ],
    beltItemNum: 3,
    speed: 1, 
    offset: 0, 
    second: 1,
    property: 'left',

  }).on('nav', function(ev) {
    var index = ev.pageIndex,
        lastIndex = ev.lastIndex,
        beltItems = ev.beltItems;

    // 实现渐变
    [].forEach.call(beltItems, function(item, key) {
      if(key === index){
        beltItems[key].style.zIndex = 2;
      }else if(key === lastIndex) {
        beltItems[key].style.zIndex = 1;
      } else {
        beltItems[key].style.zIndex = 0;
      }
    });

    var animateNo = new Animation();
    animateNo.animate(beltItems[index], 'opacity', 0, 1, 20, 100, function() {
      animateNo = null;
    });

    // 按钮选中
    navs.forEach(function(item, key) {
      if(index === key) {
        addClass(item, 'z-ative');
      } else {
        delClass(item, 'z-ative');
      }
    });
  }).run(5000);

  carousel.nav(0);
  
  
  // 热门排行
  ajax.request({
    url: url + '/hotcouresByCategory.htm',
    method: 'get',
    success: function(xhr){
      var making = new Carousel({
        container: $('j-hot'),
        tpl: '<div class="item f-cb">\
                  <div class="f-fl"><img class="item-img"></div>\
                  <div class="f-fl">\
                    <p class="f-ellipsis"></p>\
                    <i class="m-profile"></i>\
                  </div>\
                </div>',
        data: JSON.parse(xhr.responseText),
        parameter: [
          {className: 'item-img', attr: 'src', dataName: 'smallPhotoUrl'},
          {className: 'f-ellipsis', attr: 'innerHTML', dataName: 'name'},
          {className: 'm-profile', attr: 'innerHTML', dataName: 'learnerCount'},
        ],
        beltItemNum: 20,
        offset: 70,
        speed: 20, 
        second: 20,
        property: 'top',
      }).run(5000);

      making.nav(0);
    },
    error: function(xhr) {
      console.error('Request was unsuccessful: ' + xhr.status);
    }
  });

  // 选项卡
  new TagCenter({
    tags: [].slice.call(getElementsByClassName($('j-tags'), 'button')),
    callback: function(tkey, dataset) {
      
      // 显示tag 对应的内容区域
      courses.forEach(function(course, ckey) {
        if(tkey === ckey) {
          delClass(course, 'f-dn');
          var type = dataset.type;

          // 创建课程区域
          CourseFactory({
            container: course,
            type: type
          });
        } else {
          addClass(course, 'f-dn');
        }
      });
    },
  });

  // 视频
  new VideoModal({
    container: $('j-video'),
    imgUrl: 'imgs/videoBg.jpg',
    url: 'http://mov.bn.netease.com/open-movie/nos/mp4/2014/12/30/SADQ86F5S_shd.mp4',
  });
})(util, cookie, LoginModal, ajax, md5, Carousel, Animation, TagCenter, CourseFactory, VideoModal);