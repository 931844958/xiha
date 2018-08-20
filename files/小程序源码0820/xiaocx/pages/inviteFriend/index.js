// pages/authorize/index.js
var app = getApp();
Page({
  //页面的初始数据
  data: {
    invitedList:[],
    invitedResult:null,
    userId:''
  },
  //生命周期函数--监听页面加载
  onLoad: function (options) {},
  //生命周期函数--监听页面初次渲染完成
  onReady: function () {},
  //生命周期函数--监听页面显示
  onShow: function () {
    this.setData({
      userId:wx.getStorageSync("userId")
    })
    this.getInviteUserList(this)
  },
  getInviteUserList(that){
    wx.request({
      url: app.GLOBAL.baseUrl+'user/account/getInviteUserList',
      data: {
        session:JSON.stringify({
          userId:wx.getStorageSync("userId"),
          ticket:wx.getStorageSync("ticket")
        })
      },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header:{'content-type': 'application/x-www-form-urlencoded'},
      success: function(res){
        if(res.data.status===1){
          //格式化时间
          that.setData({
            invitedList:res.data.result.users,
            invitedResult:res.data.result
          })
        }
      }
    })
  },
  //button 组件设置属性 open-type="share" 触发事件
  onShareAppMessage: function (res) {
    console.log(res)
    let that=this
    return {
      title: '邀请好友赚钱',
      path: '/pages/home/index?userId='+that.data.userId,
      success: function(res) {
        console.log('转发成功')
      },
      fail: function(res) {
        console.log('转发失败')
      }
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