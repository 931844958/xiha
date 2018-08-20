var app = getApp();
let wxRequest=require('../../common/wxRequest.js')
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
    //表单验证
    let flag=true
    let tmessage=''
    if(options.name.trim()===''){
      tmessage='请输入联系人姓名'
    }else if(options.phone.trim()===''){
      tmessage='请输入手机号'
    }else if(options.feedBack.trim()===''){
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
    wxRequest.hgPost({
      name:options.name,
      phone:options.phone,
      feedBack:options.feedBack
    },'user/account/addUserFeedback').then(res=>{
      if(res.status===1){
        //调到个人中心？？
        wx.switchTab({
          url: '/pages/user/index',
        })
      }
    })
  },
  //有奖反馈列表
  getUserFeedbackList(that){
    wxRequest.hgGet({},'user/account/getUserFeedbackList').then(res=>{
      if(res.status===1){
        that.setData({
          userFeedbacks:res.result.userFeedbacks
        })
      }
    })
  },
  onReady: function () {},
  //生命周期函数--监听页面显示
  onShow: function () {
    this.getUserFeedbackList(this)
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