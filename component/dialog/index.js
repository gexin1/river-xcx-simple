/**
 * 左边button配置
 */
let defaultLeftValue = {
    text: '取消',
    type: '',
    color: '#666',
    hide: false
};
/**
 * 右边button配置
 */
let defaultRightValue = {
    text: '确定',
    type: '',
    color: '#666',
    hide: false
};
Component({
    externalClasses: ['custom-content-extend'],
    data: {
        left: defaultLeftValue,
        right: defaultRightValue
    },
    properties: {
        position: {
            type: Array,
            value: ['ICON', 'BTN']
        },
        iconClose: {
            type: Boolean,
            value: true
        },
        //是否展示dialog
        show: {
            type: Boolean,
            value: true
        },
        title: {
            type: String,
            value: '标题'
        },
        //是否展示头部
        header: {
            type: Boolean,
            value: true
        },
        //是否展示底部
        footer: {
            type: Boolean,
            value: true
        },
        leftBtn: {
            type: Object,
            value: defaultLeftValue,
            observer: function(newVal, oldVal) {
                this.updateBtnVal('left', newVal);
            }
        },
        rightBtn: {
            type: Object,
            value: defaultRightValue,
            observer: function(newVal, oldVal) {
                this.updateBtnVal('right', newVal);
            }
        }
    },
    attached() {},
    methods: {
        /**
         * 关闭
         * @param {*} e
         */
        _on_close(e) {
            const { isemit, position: dataPosition } = e.currentTarget.dataset;
            const { position } = this.data;
            if (!isemit && position.includes(dataPosition)) {
                this.triggerEvent('close', {}, {});
            }
        },
        /**
         * 确认
         * @param {*} e
         */
        _on_confirm(e) {
            const { isemit } = e.currentTarget.dataset;
            if (!isemit) {
                this.triggerEvent('confirm', {}, {});
            }
        },
        /**
         * 更新footer Button
         * @param {*} key
         * @param {*} value
         */
        updateBtnVal(key, value) {
            if (!value || !key) {
                return;
            }
            let defaultVal = {};
            defaultVal = key === 'left' ? defaultLeftValue : defaultRightValue;
            const val = Object.assign({}, defaultVal, value);
            this.setData({
                [key]: val
            });
        },
        getUserInfo(e) {
            if (e.detail.errMsg === 'getUserInfo:ok') {
                console.log(e);
                this.triggerEvent(
                    'userInfo',
                    {
                        userInfo: e.detail
                    },
                    {}
                );
            }
        }
    }
});
