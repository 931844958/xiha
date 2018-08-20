var app = getApp();
let formatTime=require('../../common/utils.js')
Page({
  //页面的初始数据
  data: {
    userInfo:null,
    withdrawRecord:[]
  },
  //生命周期函数--监听页面加载
  onLoad: function (options) {
    this.getUserInfo(this,options.extractMoney,options.extractTime,options.userId)
  },
  getUserInfo(that,extractMoney,extractTime,userId){
    wx.request({
      url: app.GLOBAL.baseUrl+'index/userInfo/v1',
      data: {
        extractMoney:extractMoney,
        extractTime:extractTime,
        userId:userId,
      },
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function(res){
        if(res.data.status===1){
          let userInfo=res.data.result.userInfo
          let gradeDivide=app.GLOBAL.gradeDivide
          for(let i=0;i<gradeDivide.length;i++){
            if(gradeDivide[i].keyss==userInfo.userGrade){
              userInfo.userGradeFormat=gradeDivide[i].explains
            }
          }
          let withdrawRecord=userInfo.withdrawRecord
          for(let i=0;i<withdrawRecord.length;i++){
            withdrawRecord[i].createTime=formatTime.formatTime(withdrawRecord[i].createTime,'Y-M-D')
          }
          that.setData({
            userInfo:userInfo,
            withdrawRecord:withdrawRecord
          })
        }
      }
    })
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