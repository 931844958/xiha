var app = getApp();
let wxRequest=require('../../common/wxRequest.js')
Page({
  //页面的初始数据
  data: {
    isBoundWeChat:false,
  },
  //生命周期函数--监听页面加载
  onLoad: function (options) {},
  //生命周期函数--监听页面初次渲染完成
  onReady: function () {},
  //生命周期函数--监听页面显示
  onShow: function () {
    if(wx.getStorageSync('userType')){
      wx.switchTab({
        url: '/pages/home/index'
      })
    }
  }, 
  //药店帐号/密码  C1/123456 药店 C1S1P1/123456
  login(options){ 
    let password=options.detail.value.password.trim()
    let accounts=options.detail.value.accounts.trim()
    if(accounts===''|| accounts.length<2 || (/[^\u0000-\u00FF]/.test(accounts))){
      this.wrongInput('请输入有效账号')
    }else if(password===''|| password.length<6 || (/[^\u0000-\u00FF]/.test(password))){
      this.wrongInput('请输入有效密码')
    }else{
      let that=this
      let options={
        platform:'miniProgram',
        loginType:'0',
        password:password,
        accounts:accounts
      }
      this.accountLogin(this,options,'logininfo/login')
    }
  },
  accountLogin(that,options,path){
    wxRequest.hgPostNosession(options,path,'https://fish.vilicom.cn/fish_ds_web_test/').then(res=>{
      if(res.status===1){
        wx.setStorageSync('userId',res.result.userId)
        wx.setStorageSync('ticket',res.result.ticket)
        wx.setStorageSync('openId',res.result.openId)
        wx.setStorageSync('isBoundWeChat',res.result.isBoundWeChat)
        //用户类型
        wx.setStorageSync('userType',res.result.userType)
        //未绑定
        if(res.result.isBoundWeChat===0){
          that.setData({
            isBoundWeChat:true
          })
        }else {
          if(!wx.getStorageSync('firstLogin')){
            wx.redirectTo({
              url: '/pages/leading/index'
            })
          }else{
            wx.switchTab({
              url: '/pages/home/index'
            })
          }
        }
      }else{
        wx.showToast({
          title:res.message,
          duration:3000,
          icon:'none'
        })
      }
    })
  },
  wrongInput(text){
    wx.showToast({
      title:text,
      icon:'none'
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