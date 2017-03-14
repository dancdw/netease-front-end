var ajax = (function() {

    return {
        // 发起请求
        request: function(opt) {
            var url = opt.url || '',
                async = opt.async || true,
                method = opt.method.toUpperCase() || 'get',
                data = opt.data || {},
                success = opt.success || function() {},
                error = opt.error || function() {};

            this.xhrObj = this.xhrObj ? this.xhrObj : this._getXMLHttpRequest();

            this._bindResponseEvent(error, success);

            this._sendRequest(method, url, data, async);
        },

        // 绑定事件
        _bindResponseEvent: function(error, success) {
            var xhr = this.xhrObj;
            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4) {
                    if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
                        success(xhr);
                    } else {
                        error(xhr);
                    }
                }
            }
        },

        // 发送
        _sendRequest: function(method, url, data, async) {
            var xhr = this.xhrObj,
                serialize = this._serialize;
            if (method == "post") {
                xhr.open(method, url, async);
                xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                xhr.send(serialize(data));
            } else {
                xhr.open(method, url + "?" + serialize(data), async);
                xhr.send(null);
            }
        },

        // 获取 XMLHttpRequest 兼容
        _getXMLHttpRequest: function() {
            if (window.XMLHttpRequest) {
                return new XMLHttpRequest();
            } else {
                var names = ["msxml", "msxml2", "msxml3", "Microsoft"];
                for (var i = 0; i < names.length; i++) {
                    try {
                        return new ActiveXObject(names[i] + ".XMLHTTP");
                    } catch (e) {}
                }
            }
            return null;
        },

        // 对象转换成字符串
        _serialize: function(data) {
            if (!data) return '';
            var pairs = [],
                name,
                value;

            for (name in data) {
                if (!data.hasOwnProperty(name)) continue;
                if (typeof data[name] === 'function') continue;
                name = encodeURIComponent(name);
                value = encodeURIComponent(data[name].toString());
                pairs.push(name + '=' + value);
            }
            return pairs.join('&');
        },
    }

})();
