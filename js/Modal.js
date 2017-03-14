! function(util) {
    var doc = document,
        html2node = util.html2node,
        addEvent = util.addEvent,
        delClass = util.delClass,
        addClass = util.addClass,
        getStyleFloat = util.getStyleFloat,
        getElementsByClassName = util.getElementsByClassName,
        isMove = 0,
        modalTpl = '<div class="m-modal f-dn">\
                    <div class="bg"></div>\
                    <div class="modal_wrap">\
                      <div class="modal_close"></div>\
                      <h3 class="modal_head"></h3>\
                    </div>\
                  </div>';

    function Modal() {
        if (!(this instanceof Modal)) return new Modal;
    }

    Modal.prototype = {
        // 创建模态
        createModal: function(opt) {
            var opt = opt ? opt : {},
                tpl = opt.tpl ? opt.tpl : '<div></div>',
                content = html2node(tpl),
                modal = this.modal = html2node(modalTpl);

            this.modal_wrap = getElementsByClassName(modal, 'modal_wrap')[0];
            this.modal_head = getElementsByClassName(modal, 'modal_head')[0];
            this.modal_close = getElementsByClassName(modal, 'modal_close')[0];

            // 将具体内容插入节点
            this.modal_wrap.appendChild(content);

            // 绑定事件
            this._bindModalEvent();

            return modal;
        },

        // 停止拖动
        _stop: function() {
            isMove = 0;

            // 恢复文字可被选中
            this._fontSel(true);
        },

        // 绑定事件
        _bindModalEvent: function() {
            var supX,
                offsetLeft,
                offsetTop,
                self = this;

            // 按下
            addEvent(this.modal_head, 'mousedown', function(e) {
                var e = e || window.event;
                isMove = 1; // 记录按下

                // 计算鼠标到 Modal 的距离
                offsetLeft = e.clientX - getStyleFloat(self.modal_wrap, 'left');
                offsetTop = e.clientY - getStyleFloat(self.modal_wrap, 'top');

                // 设置右边界
                supX = doc.documentElement.clientWidth - self.modal_wrap.clientWidth;

                // 禁止文字被选中
                self._fontSel(false);
            });

            // 拖动
            addEvent(doc, 'mousemove', function(e) {
                var e = e || window.event;
                if (isMove) {

                    // 计算移动后位置
                    var currLeft = e.clientX - offsetLeft;
                    var currTop = e.clientY - offsetTop;

                    self.modal_wrap.style.left = (currLeft > 0 ? (currLeft > supX ? supX : currLeft) : 0) + 'px';
                    self.modal_wrap.style.top = currTop + 'px';
                }
            });

            // 松开
            addEvent(doc, 'mouseup', this._stop.bind(this));

            // 隐藏
            addEvent(this.modal_close, 'click', this.destroy.bind(this));
        },

        // 隐藏模态
        _hide: function() {
            addClass(this.modal, 'f-dn');
        },

        // 当前是否能选中文字
        _fontSel: function(sel) {
            if (!sel) {
                doc.onselectstart = doc.onmousedown = doc.onmouseup = new Function("return false");
            } else {
                doc.onselectstart = doc.onmousedown = doc.onmouseup = null;
            }
        },

        // 显示模态
        show: function(title) {
            var doc = document,
                title = title ? title : '标题',
                modal = this.modal,
                modal_wrap = this.modal_wrap;

            // 设置标题
            this._setTitle(title);

            delClass(modal, 'f-dn');

            // 居中
            modal_wrap.style.left = doc.documentElement.clientWidth / 2 - modal_wrap.clientWidth / 2 + 'px';
            modal_wrap.style.top = doc.documentElement.clientHeight / 2 - modal_wrap.clientHeight / 2 + 'px';

            return this;
        },

        // 销毁模态
        destroy: function() {
            this.modal.parentNode.removeChild(this.modal);
        },

        // 设置标题内容
        _setTitle: function(content) {
            if (!content) return;
            var modal_head = this.modal_head;
            // 是否是节点
            if (content.nodeType === 1) {
                modal_head.innerHTML = null;
                modal_head.appendChild(content);
            } else {
                modal_head.innerHTML = content;
            }
        },
    }

    // 暴露 API
    if (typeof exports === 'object') {
        module.exports = Modal;
    } else if (typeof define === 'function' && define.amd) {
        // 支持amd
        define(function() {
            return Modal;
        });
    } else {
        window.Modal = Modal;
    }
}(util);
