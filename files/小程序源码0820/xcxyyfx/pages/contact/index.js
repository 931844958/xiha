// pages/authorize/index.js
var app = getApp();
Page({
  //页面的初始数据
  data: {},
  //生命周期函数--监听页面加载
  onLoad: function (options) {},
  //生命周期函数--监听页面初次渲染完成
  onReady: function () {},
  makeCall(){
    wx.makePhoneCall({
      phoneNumber: '17666143788'
    })
  },
  copppy(e){
    let data=e.currentTarget.dataset.data
    wx.setClipboardData({
      data:data
    })
  },
  //识别二维码（预览模式才可以）小程序专用的圆形码可以识别，微信公众号二维码不行(那就是不行喽)
  // showMask(){
  //   wx.previewImage({// 获取图片信息（此处可不要）  
  //     current: 'https://fish.city-game.cn/h5/yyjk/youyujiankang.jpg', // 当前显示图片的http链接
  //     urls: ['https://fish.city-game.cn/h5/yyjk/youyujiankang.jpg'] // 需要预览的图片http链接列表
  //  })  
  //},
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