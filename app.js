//app.js
//初始化挂载wx对象
import './init-start/index';

App({
    onLaunch: function() {
        //储存手机信息
        const device = wx.getSystemInfoSync();
        const { system, windowWidth, statusBarHeight, model } = device;

        this.globalData.navTop = statusBarHeight;
        //获取手机顶部状态栏的高度
        let navHeight = statusBarHeight;
        //加上 自定义title的高度
        navHeight += (92 * windowWidth) / 750;
        //获得导航栏的所有高度
        this.globalData.navHeight = navHeight;
        this.globalData.device = device;
    },
    globalData: {
        navTop: 0,
        navHeight: 0,
        device: null
    }
});
