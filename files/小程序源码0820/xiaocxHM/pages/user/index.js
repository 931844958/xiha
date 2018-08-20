var app = getApp();
let wxRequest=require('../../common/wxRequest.js')
Page({
  //页面的初始数据 
  data: {
    userData:null
  },
  //生命周期函数--监听页面加载
  onLoad: function (options) {},
  //生命周期函数--监听页面初次渲染完成
  onReady: function () {},
  //生命周期函数--监听页面显示
  onShow: function () {
    this.findUserInfo(this)
  },
  findUserInfo(that){ 
    wxRequest.hgGet({},'user/account/findUserInfo').then(res=>{
      if(res.status===1){
        let userData=res.result.user
        userData.phone=userData.phone.slice(0,3)+'********'
        that.setData({
          userData:userData
        })
      }
    })
  },
  //查询用户地址
  getUserAddress(){
    wx.request({
      //url:'http://9m98ag.natappfree.cc/user/account/getUserAddress',
      url:app.GLOBAL.hgHTTP+ 'user/account/getUserAddress',
      data: {
        userId:wx.getStorageSync('userId')
      },
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      success: function(res){
        if(res.data.status===1){
          console.log(res.data)
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