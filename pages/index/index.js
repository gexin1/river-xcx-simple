const app = getApp();
import Skeleton from '../../lib/skeleton/index';
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
    skeletonPrevent: Skeleton.skeletonPrevent,
    onLoad() {
        this.skeleton = new Skeleton(this);
    },
    onReady() {
        this.skeleton.init();
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
