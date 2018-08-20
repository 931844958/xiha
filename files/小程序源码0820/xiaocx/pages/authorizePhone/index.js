let wxRequest=require('../../common/wxRequest')
Page({
  //页面的初始数据
  data: {},
  //生命周期函数--监听页面加载
  onLoad: function (options) {},
  //生命周期函数--监听页面初次渲染完成
  onReady: function () {},
  //生命周期函数--监听页面显示
  onShow: function () {},
  //绑定手机
  getPhoneNumber(e){
    console.log("绑定手机")
    console.log(e.detail.errMsg)
    if(e.detail.errMsg.indexOf('fail')!==-1){
      //拒绝授权的情况
      return;
    }
    //如果未绑定e.detail.encryptedData和e.detail.iv都为空
    //如果未绑定 应该先return
    this.wxLogin(this,e.detail.encryptedData,e.detail.iv)
  },
  wxLogin(that,encryptedData,iv){
    //微信登录获取code（code有效期5分钟）
    wx.login({
      success: function(res) {
        //必须这么嵌套，否则报错（code been used）
        wxRequest.yyGetNosession({
          smallProgramCode:res.code
        },'order/miniappsAuthorization').then(res=>{
          console.log("获取sessionKey")
          console.log(res.result)
          //获取sessionKey用于解密
          that.getUserInfoBinfPhone(that,encryptedData,iv,res.result.sessionKey)
        })
      }
    });
  },
  //绑定手机号
  getUserInfoBinfPhone(that,encryptedData,iv,sessionKey){
    wxRequest.yyPost({
      sessionKey:sessionKey,
      encryptedData:encryptedData,
      iv:iv
    },'user/account/miniProgramBindingPhone/v1').then(res=>{
      if(res.status===1){
        console.log("getUserInfoBinfPhone")
        console.log(res.result)
        //设置本地缓存（绑定手机号时重新设置）
        wx.setStorageSync('userId',res.result.userId)
        wx.setStorageSync('ticket',res.result.ticket)
        wx.setStorageSync('openId',res.result.openId)
        wx.setStorageSync('isBoundPhone',res.result.isBoundPhone)
        //绑定手机号、获取用户信息之后跳转到首页
        //为什么微信的那些人不写一个类似vue的watch或者react的shouldComponentsUpdate
        //绑定成功标识符
        wx.navigateBack()
      }else{
        //用户不存在？？
        console.log("getUserInfoBinfPhone-fail")
        console.log(res)
        wx.showToast({
          title:res.message,
          duration:3000,
          icon:'none'
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
  onShareAppMessage: function () {}
})