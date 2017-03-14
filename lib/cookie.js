var cookie = (function() {
    var dataObj = {};

    // 初始化
    (function() {
        var all = document.cookie;
        if (all === '') return dataObj;
        var list = all.split('; ');
        for (var i = 0, len = list.length; i < len; i++) {
            var item = list[i];
            var p = item.indexOf('=');
            var name = item.substring(0, p);
            name = decodeURIComponent(name);
            var value = item.substring(p + 1);
            value = decodeURIComponent(value);
            dataObj[name] = value;
        }
    })();

    return {
        // 获取项
        getItem: function(name) {
            return dataObj[name];
        },

        // 增加项
        setItem: function(name, value, maxage, path, domain, secure) {
            dataObj[name] = value;
            var name = encodeURIComponent(name);
            var value = encodeURIComponent(value);
            var cookie = name + '=' + value;
            if (maxage)
                cookie += '; maxage=' + maxage;
            if (path)
                cookie += '; path=' + path;
            if (domain)
                cookie += '; domain=' + domain;
            if (secure)
                cookie += '; secure=' + secure;
            document.cookie = cookie;
        },

        // 清除项
        delItem: function(name) {
            if (!(name in dataObj)) return;
            delete dataObj[name];
            document.cookie = name + '=; max-age=0';
        },

        // 清除所有
        clear: function() {
            for (k in dataObj) document.cookie = k + '=; max-age=0';
            dataObj = {};
        }
    }
})();
