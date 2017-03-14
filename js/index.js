(function(util, cookie, ajax, md5, Carousel, animation, TagCenter, CourseFactory, VideoModal, Follow, Notice) {
    var $ = util.$,
        addEvent = util.addEvent,
        addClass = util.addClass,
        delClass = util.delClass,
        getElementsByClassName = util.getElementsByClassName,
        url = 'https://study.163.com/webDev',
        follow = $('j-follow'),
        hasfollow = $('j-hasfollow'),
        md5 = md5.md5,
        getStyleNum = util.getStyleNum,
        getChildren = util.getChildren,
        navs = [].slice.call(getElementsByClassName($('j-carousel-full'), 'cursor')),
        courses = [].slice.call(getElementsByClassName($('j-courses'), 'course'));


    // 通知条
    Notice().init();

    // 关注订阅
    Follow().init();


    // 为按钮添加切换轮播 banner
    navs.forEach(function(item, key) {
        addEvent(item, 'click', function() {
            carousel.nav(key);
        });
    });

    // 轮播 banner
    var carousel = Carousel({
        container: $('j-carousel'),
        tpl: '<a class="item-url" target="_blank" ><img class="item-img"/></a>',
        data: [
            { src: 'imgs/banner0.jpg', url: 'http://open.163.com/' },
            { src: 'imgs/banner1.jpg', url: 'http://study.163.com/' },
            { src: 'imgs/banner2.jpg', url: 'http://www.icourse163.org/' },
        ],
        parameter: [
            { className: 'item-img', attr: 'src', dataName: 'src' },
            { className: 'item-url', attr: 'href', dataName: 'url' },
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

        if (lastIndex === index) return;

        // 实现渐变
        [].forEach.call(beltItems, function(item, key) {
            beltItems[key].style.opacity = 0;
            if (key === index) {
                beltItems[key].style.zIndex = 2;
            } else if (key === lastIndex) {
                beltItems[key].style.zIndex = 1;
            } else {
                beltItems[key].style.zIndex = 0;
            }
        });

        animation.animate(beltItems[index], 'opacity', 0.3, 1, 20, 200);

        // 按钮选中
        navs.forEach(function(item, key) {
            if (index === key) {
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
        success: function(xhr) {
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
                    { className: 'item-img', attr: 'src', dataName: 'smallPhotoUrl' },
                    { className: 'f-ellipsis', attr: 'innerHTML', dataName: 'name' },
                    { className: 'm-profile', attr: 'innerHTML', dataName: 'learnerCount' },
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
    TagCenter({
        tags: [].slice.call(getElementsByClassName($('j-tags'), 'button')),
        callback: function(tkey, dataset) {

            // 显示tag 对应的内容区域
            courses.forEach(function(course, ckey) {
                if (tkey === ckey) {
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
    VideoModal({
        container: $('j-video'),
        imgUrl: 'imgs/videoBg.jpg',
        url: 'https://mov.bn.netease.com/open-movie/nos/mp4/2014/12/30/SADQ86F5S_shd.mp4',
    });
})(util, cookie, ajax, md5, Carousel, animation, TagCenter, CourseFactory, VideoModal, Follow, Notice);
