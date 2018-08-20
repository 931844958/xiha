var app = getApp();
Page({
  //页面的初始数据
  data: {
    userFeedbacks:null
  },
  //生命周期函数--监听页面加载
  onLoad: function (options) {},
  //生命周期函数--监听页面初次渲染完成
  pushFeed(e){
    let options=e.detail.value
    let flag=true
    let tmessage=''
    // if(options.name.trim()===''){
    //   tmessage='请输入联系人姓名'
    // }else if(options.phone.trim()===''){
    //   tmessage='请输入手机号'
    // }else if(options.feedBack.trim()===''){
    //   tmessage='请输入反馈意见'
    // }else{
    //   flag=false
    // }
    if(options.feedBack.trim()===''){
      tmessage='请输入反馈意见'
    }else{
      flag=false
    }
    if(flag){
      wx.showToast({
        title: tmessage,
        icon: 'none',
        duration: 2000
      })
      return;
    }
    wx.showToast({
      title: '正在提交',
      icon: 'loading'
    })
    let that=this
    wx.request({
      url: app.GLOBAL.hgHTTP+'user/account/addUserFeedback',
      //url: 'http://9m98ag.natappfree.cc/user/account/addUserFeedback',
      data: {
        // name:options.name,
        // phone:options.phone,
        session:JSON.stringify({
          userId:wx.getStorageSync('userId'),
          ticket:wx.getStorageSync('ticket')
        }),
        feedBack:options.feedBack,
      },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header:{'content-type': 'application/x-www-form-urlencoded'},
      success: function(res){
        wx.hideToast()
        if(res.data.status===1){
          wx.showToast({
            title: res.data.message,
            duration: 3000
          })
          setTimeout(()=>{
            //调到个人中心？？
            wx.switchTab({
              url: '/pages/user/index',
            })
          },3000)
        }
      }
    })
  },
  //有奖反馈列表
  getUserFeedbackList(that){
    wx.request({
      //url:'http://9m98ag.natappfree.cc/user/account/getUserFeedbackList',
      url:app.GLOBAL.hgHTTP+ 'user/account/getUserFeedbackList',
      data: {
        session:JSON.stringify({
          userId:wx.getStorageSync('userId'),
          ticket:wx.getStorageSync('ticket')
        })
      },
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      success: function(res){
        if(res.data.status===1){
          that.setData({
            userFeedbacks:res.data.result.userFeedbacks
          })
          console.log(that.data.userFeedbacks)
        }
      }
    })
  },
  onReady: function () {},
  //生命周期函数--监听页面显示
  onShow: function () {
    //this.getUserFeedbackList(this)
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