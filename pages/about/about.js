// pages/about/about.js

Page({
    data: {
        leftBtn: {
            hide: true
        }
    },
    login() {
        wx.showLoading({
            title: '加载中...',
            mask: true
        });
        wx.$http
            .login()
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            })
            .finally(() => {
                wx.hideLoading();
            });
    },
    chooseImg() {
        wx.pifyChooseImage().then(res => {
            console.log(res);
        });
    },
    onShareAppMessage: wx.$shareMessage
});
