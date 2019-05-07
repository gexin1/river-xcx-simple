//app.js
//初始化挂载wx对象
import './init-start/index';

App({
    onLaunch: function() {
        //储存手机信息
        const device = wx.getSystemInfoSync();
        const { system, windowWidth, statusBarHeight, model } = device;
        this.globalData.navTop = statusBarHeight;
        let navHeight = statusBarHeight;
        navHeight += (92 * windowWidth) / 750;
        this.globalData.navHeight = navHeight;
        this.globalData.device = device;
    },
    globalData: {
        navTop: 0,
        navHeight: 0,
        device: null,
        phoneSystem: 'Android'
    }
});
