let wxRequest=require('../../common/wxRequest.js')
Page({
  //页面的初始数据
  data: {
    
  },
  //生命周期函数--监听页面加载
  onLoad: function (options) {},
  //生命周期函数--监听页面初次渲染完成
  onReady: function () {},
  //生命周期函数--监听页面显示
  onShow: function () {
    let userType=wx.getStorageSync('userType')
    if(userType===1){
      this.setData({
        pharmacyResultVo:wx.getStorageSync("pharmacyResultVo")
      })
    }else if(userType===3){
      wx.showModal({
        content:'您当前的身份为代理，暂无专属码',
        showCancel:false,
        success:function(res){
          if(res.confirm){
            wx.switchTab({
              url: '/pages/home/index'
            })
          }
        }
      })
    }
    
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