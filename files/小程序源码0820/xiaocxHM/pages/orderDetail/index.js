var app = getApp();
let formatTime=require('../../common/utils.js')
let wxRequest=require('../../common/wxRequest.js')
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
    wxRequest.hgGet({orderSn:orderSn},'user/account/findOrderById').then(res=>{
      if(res.status===1){
        let orderDetail=res.result.orderFormVo
        orderDetail.createTime=formatTime.formatTime(orderDetail.createTime,'Y-M-D h:m')
        that.setData({
          orderDetail:orderDetail
        })
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