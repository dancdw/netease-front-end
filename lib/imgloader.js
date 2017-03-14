var imgloader = (function() {
    var SUCCESS = 1,
        ERROR = 0;

    return {

        onloadImg: function(ImgArr, callback, timeout) {
            var count = ImgArr.length,
                errorData = [], // 加载失败数据
                state = SUCCESS, // 全部加载完毕后的状态
                isTimeout, // 超时的timerId
                res = {}; // 返回给用户的结果

            for (var k in ImgArr) {
                var item = ImgArr[k];
                if (typeof item === 'string') {
                    item = { src: item };
                }

                if (!item.src) continue;

                item.elem = new Image;

                doload(item);
            }

            // 设置超时
            if (timeout) {
                res.state = ERROR;
                res.msg = '加载超时';
                isTimeout = setTimeout(callback(res), timeout);
            }

            // 预加载图片
            function doload(item) {
                var img = item.elem;

                // 加载完成回调函数
                var done = function() {
                    img.onload = img.onerror = null;
                    count--;

                    // 全部加载完毕并且未超时
                    if (count === 0 && !isTimeout) {
                        res.state = state;
                        if (callback)
                            if (state === SUCCESS) {
                                callback(res);
                            } else {
                                res.errorData = errorData;
                                res.msg = '图片加载过程中发生错误';
                                callback(res);
                            }
                    }
                }

                img.onload = function() {
                    state = state && SUCCESS;
                    item.status = 'loaded';
                    done();
                }

                img.onerror = function() {
                    state = ERROR;
                    item.status = 'error';
                    errorData.push(item);
                    done();
                };

                img.src = item.src;
            }
        }
    }
})();
