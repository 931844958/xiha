let wxRequest=require('../../common/wxRequest.js')
Page({
  //页面的初始数据
  data: {},
  //生命周期函数--监听页面加载
  onLoad: function (options) {},
  //生命周期函数--监听页面初次渲染完成
  onReady: function () {},
  //生命周期函数--监听页面显示
  onShow: function () {},
  wrongInput(text){
    wx.showToast({
      title:text,
      duration:3000,
      icon:'none'
    })
  },
  updatePassword(options){
    let oldPassword=options.detail.value.oldPassword.trim()
    let password=options.detail.value.password.trim()
    let repassword=options.detail.value.repassword.trim()
    if(oldPassword===''||oldPassword.length<6|| (/[^\u0000-\u00FF]/.test(oldPassword))){
      this.wrongInput('请输入原密码')
    }else if(password===''||password.length<6|| (/[^\u0000-\u00FF]/.test(password))){
      this.wrongInput('请输入新密码')
    }else if(repassword!==password){
      this.wrongInput('新密码两次输入不一致')
    }else if(oldPassword===password){
      this.wrongInput('新密码不能与旧密码相同')
    }else{
      let that=this
      wxRequest.hgPost({
        // wechatCode:wechatCode,
        // platform:'miniProgram',
        // loginType:'0',
        password:password,
        oldPassword:oldPassword,
      },'logininfo/updatePassword','https://fish.vilicom.cn/fish_ds_web_test/').then(res=>{
        if(res.status===1){
          wx.clearStorageSync()
          wx.showModal({
            content: '修改成功，请重新登录',
            showCancel:false,
            success: function(res) {
              //修改密码完了调用注销接口
              if (res.confirm) {
                wx.redirectTo({
                  url: "/pages/login/index"
                })
              }
            }
          })
        }else{
          wx.showToast({
            title:res.message,
            duration:3000
          })
        }
      })
    }
  },
  makeCall(){
    wx.makePhoneCall({
      phoneNumber: '17666143788'
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