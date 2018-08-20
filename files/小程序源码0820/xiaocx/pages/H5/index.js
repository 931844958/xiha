// pages/authorize/index.js
var app = getApp();
Page({
  //页面的初始数据
  data: {
    URL:''
  },
  //生命周期函数--监听页面加载
  onLoad: function (options) {
    
    let uid=wx.getStorageSync('userId')
    let token=wx.getStorageSync('ticket')
    //文章详情
    if(options.articleId){
      this.setData({ 
        URL:options.url+"?articleId="+options.articleId+"&articleType="+options.articleType+"&uid="+uid+"&token="+token
      })
    }else{
      this.setData({ 
        URL:options.url+"?uid="+uid+"&token="+token
      })
    }
  },
  //生命周期函数--监听页面初次渲染完成
  onReady: function () {},
  //生命周期函数--监听页面显示
  onShow: function () {},
  //生命周期函数--监听页面隐藏
  onHide: function () {},
  //生命周期函数--监听页面卸载
  onUnload: function () {},
  //页面相关事件处理函数--监听用户下拉动作
  onPullDownRefresh: function () {},
  //页面上拉触底事件的处理函数
  onReachBottom: function () {},
  //用户点击右上角分享
  onShareAppMessage: function () {},
})