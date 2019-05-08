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
    onReady() {},
    onShow() {
        this.skeleton.init();
        setTimeout(() => {
            this.skeleton.close();
        }, 2000);
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
