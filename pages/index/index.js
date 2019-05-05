const app=getApp();

Page({
    /**
     * 页面的初始数据
     */
    data: {
        navTop:app.globalData.navTop,
        leftBtn:{
            hide:true
        } 
    },
  
    onShareAppMessage:wx.$shareMessage
});

