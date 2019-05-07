const app = getApp();

Page({
    /**
     * 页面的初始数据
     */
    data: {
        navTop: app.globalData.navTop,
        leftBtn: {
            hide: true
        },
        skeletonList: [],
        showSkeleton: true
    },
    onLoad() {
        // wx.pifyShowModel({
        //     content: '我是一个提示框'
        // });
    },
    onReady() {
        const query = wx.createSelectorQuery();
        query.selectAll('.skeleton').boundingClientRect(res => {
            this.setData({
                skeletonList: res
            });
        });
        query.exec();
    },
    reqLogin() {
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
