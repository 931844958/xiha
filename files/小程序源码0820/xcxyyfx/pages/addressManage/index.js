let wxRequest=require('../../common/wxRequest.js')
Page({
  //页面的初始数据
  data: {
    addressList:[]
  },
  //生命周期函数--监听页面加载
  onLoad: function (options) {},
  //生命周期函数--监听页面初次渲染完成
  onReady: function () {},
  //生命周期函数--监听页面显示
  onShow: function () {
    wx.showLoading({
      title: '加载中',
      icon: 'loading' 
    })
    this.getUserAddress(this)
  },
  //查询用户地址
  getUserAddress(that){
    wxRequest.hgGetNosession({
      userId:wx.getStorageSync('userId')
    },'user/account/getUserAddress').then(res=>{
      if(res.status===1){
        that.setData({
          addressList:res.result.address
        })
        wx.hideLoading()
      }
    })
  },
  editAddress(e){
    wx.redirectTo({
      url: '/pages/addressEdit/index?id='+e.target.dataset.id,
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