//获取应用实例
var app = getApp();
Page({
  data:{
    userInfo:null
  },
  goToIndex(){
    wx.switchTab({
      url: '/pages/products/index',
    });
  }
})