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
  //获取用户信息（fail auth deny：：：注意处理用户拒绝授权的情况）
  bindGetUserInfo(e){
    if(e.detail.errMsg.indexOf('fail')!==-1){
      //拒绝授权的情况
      return;
    }
    let that=this
    //微信登录获取code（code有效期5分钟）
    wx.login({
      success: function(res) {
        //必须这么嵌套，否则报错（code been used）
        wxRequest.yyGetNosession({
          smallProgramCode:res.code,
        },'order/miniappsAuthorization').then(res=>{
          console.log("获取sessionKey")
          console.log(res.result)
          if(res.status===1){
            that.accountLogin(that,e.detail.encryptedData,e.detail.iv,res.result.sessionKey)
          }else{
            wx.showToast({
              title:res.message,
              duration:3000,
              icon:'none'
            })
          }
        })
      }
    });
  },
   //登录
  accountLogin(that,encryptedData,iv,sessionKey){
    wxRequest.yyPostNosession({
      sessionKey:sessionKey,
      encryptedData:encryptedData,
      iv:iv,
      loginType:6,
      platform:'MiniProgram'
    },'user/account/login/v1').then(res=>{
      console.log("user/account/login/v1")
      console.log(res.result)
      if(res.status===1){
        //设置本地缓存（绑定手机号时重新设置）
        wx.setStorageSync('userId',res.result.userId)
        wx.setStorageSync('ticket',res.result.ticket)
        wx.setStorageSync('openId',res.result.openId)
        wx.setStorageSync('isBoundPhone',res.result.isBoundPhone)
        
        if(res.result.isBoundPhone===0){
          //未绑定手机（再去手机绑定页面授权）
          wx.redirectTo({ 
            url: "/pages/authorizePhone/index"
          })
        }else{
          //已绑定手机，跳转到发首页开始薅羊毛
          wx.navigateBack()
        }
      }else{
        //小程序登录验证失败
        console.log("accountLogin-fail")
        console.log(res.data)
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