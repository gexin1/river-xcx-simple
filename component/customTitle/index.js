const app = getApp();

/**
 * 默认左按钮
 * text 显示的文本
 * icon 显示的图标
 * type 按钮的类型 open-type=''
 * dataLink 跳转页面路径
 * linkType 跳转方式
 * hide 是否隐藏按钮
 */
let defaultLeftValue = {
    text: '返回',
    icon: 'left-back',
    type: '',
    dataLink: '',
    linkType: 'back',
    hide: false
};
/**
 * 默认右按钮
 */
let defaultRightValue = {
    text: '右边',
    icon: 'left-back',
    type: '',
    dataLink: '',
    linkType: 'navigateTo',
    hide: true
};
Component({
    externalClasses: ['custom-title-extend'],
    properties: {
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
        },
        title: {
            type: String,
            value: '种草主义'
        },
        autoNavigation: {
            type: Boolean,
            value: true
        }
    },
    attached() {
        let {
            device: { statusBarHeight }
        } = app.globalData;
        this.setData({
            distanceTopHeight: statusBarHeight
        });
    },
    ready() {
        if (this.data.autoNavigation) {
            this.setData({
                left:
                    getCurrentPages().length <= 1
                        ? {
                              text: '',
                              icon: 'home',
                              dataLink: '/pages/index/index',
                              linkType: 'switchTab',
                              hide: false
                          }
                        : {
                              text: '', //整个界面都没有用到返回直接先屏蔽
                              text: '',
                              icon: 'left-back',
                              linkType: 'back',
                              hide: false
                          }
            });
        }
    },
    data: {
        distanceTopHeight: 48,
        left: defaultLeftValue,
        right: defaultRightValue
    },
    methods: {
        _leftClick(e) {
            this.btnClickHandle(e);
        },
        _rightClick(e) {
            this.btnClickHandle(e);
        },
        btnClickHandle(e) {
            const { link, type = 'navigateTo', isemit = null } = e.currentTarget.dataset;
            if (isemit) {
                return;
            } else if (type === 'back') {
                wx.navigateBack();
            } else if (type === 'navigateTo') {
                wx.navigateTo({
                    url: link
                });
            } else if (type === 'switchTab') {
                wx.switchTab({
                    url: link
                });
            } else if (type === 'redirectTo') {
                wx.redirectTo({
                    url: link
                });
            }
        },
        updateBtnVal(key, value) {
            if (!value || !key) {
                return;
            }
            const val = Object.assign({}, key === 'left' ? defaultLeftValue : defaultRightValue, value);
            this.setData({
                [key]: val
            });
        }
    }
});
