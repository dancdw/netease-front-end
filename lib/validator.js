! function(_) {

    function Validator() {
        if (!(this instanceof Validator)) return new Validator;
    }

    Validator.prototype = {

        // 验证规则匹配
        _Commands: function(data) {
            var rule = data.rule,
                value = data.fieldElem.value,
                ruleExt = data.ruleExt;

            switch (rule) {
                case 'required':
                    return _.isEmpty(value) ? false : true;
                case 'regexp':
                    return eval(ruleExt).test(value);
                case 'minlength':
                    return _.isEmpty(value) ? false : value.length > ruleExt;
                case 'maxlength':
                    return _.isEmpty(value) ? false : value.length < ruleExt;
            }

        },

        // 设置表单控件
        setForm: function(elem) {
            this.form = elem;
        },

        // 对数据进行验证
        checkValidation: function() {
            var self = this;
            this.errData = {};

            this.ruleData.forEach(function(item) {
                if (!self._Commands(item))
                    if (!self.errData.hasOwnProperty(item.name)) {
                        self.errData[item.name] = [item.msg];
                    } else {
                        self.errData[item.name].push(item.msg);
                    }
            });
            return this;
        },

        // 添加需验证 的数据
        addValidation: function(arr) {
            var self = this;
            this.ruleData = [];

            // 判断是否是该表单字段
            arr.forEach(function(item) {
                var fieldElem = self.form[item.name];
                if (fieldElem) {
                    item['fieldElem'] = fieldElem;
                    self.ruleData.push(item);
                }
            });
            return this;
        },

        // 返回全部验证失败 的数据
        showError: function() {
            return this.errData;
        },

        // 只返回第一条验证失败 的数据
        showErrorSingle: function() {
            for (k in this.errData) {
                return { name: k, msg: this.errData[k][0] };
            }
        },
    }

    // 暴露 API
    if (typeof exports === 'object') {
        module.exports = Validator;
    } else if (typeof define === 'function' && define.amd) {
        // 支持amd
        define(function() {
            return Validator;
        });
    } else {
        window.Validator = Validator;
    }
}(util);
