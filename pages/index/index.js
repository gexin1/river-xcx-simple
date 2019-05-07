const app = getApp();

Page({
    /**
     * 页面的初始数据
     */
    data: {
        navTop: app.globalData.navTop,
        leftBtn: {
            hide: true
        }
    },
    onLoad() {
        wx.$http
            .login()
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            });
    },
    onShareAppMessage: wx.$shareMessage
});
