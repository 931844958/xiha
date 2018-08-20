var app = getApp();
let formatTime=require('../../common/utils.js')
Page({
  //页面的初始数据
  data: {
    orderDetail:null
  },
  //生命周期函数--监听页面加载
  onLoad: function (options) {
    this.findOrderById(this,options.orderSn)
  },
  //生命周期函数--监听页面初次渲染完成
  onReady: function () {},
  //生命周期函数--监听页面显示
  onShow: function (options) {
  },
  findOrderById(that,orderSn){
    wx.showToast({
      title: '加载中',
      icon: 'loading'
    })
    wx.request({
      //url:'http://9m98ag.natappfree.cc/user/account/findOrderById',
      url:app.GLOBAL.hgHTTP+ 'user/account/findOrderById',
      data: {
        orderSn:orderSn,
        session:JSON.stringify({
          userId:wx.getStorageSync('userId'),
          ticket:wx.getStorageSync('ticket')
        }),
      },
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function(res){
        wx.hideLoading()
        if(res.data.status===1){
          let orderDetail=res.data.result.orderFormVo
          orderDetail.createTime=formatTime.formatTime(orderDetail.createTime,'Y-M-D h:m')
          that.setData({
            orderDetail:orderDetail
          })
          console.log(that.data.orderDetail)
        }
      }
    })
  },
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