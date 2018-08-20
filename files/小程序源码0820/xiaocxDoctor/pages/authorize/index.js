let wxRequest=require('../../common/wxRequest.js')
var app = getApp();
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
    console.log(e);
    console.log(e.detail.errMsg)
    if(e.detail.errMsg.indexOf('fail')!==-1){
      //拒绝授权的情况
      return;
    }
    let that=this
    //微信登录获取code（code有效期5分钟）
    wx.login({
      success: function(res) {
        //必须这么嵌套，否则报错（code been used）
        console.log(res) 
        wxRequest.hgGetNosession({
          smallProgramCode:res.code,
          generalizeUser:wx.getStorageSync('inviteCode')
        },'user/account/miniappsAuthorization').then(res=>{
          //获取sessionKey用于解密
          that.accountLogin(that,e.detail.encryptedData,e.detail.iv,res.result.sessionKey)
        })
      },
      fail: function(err) {
        console.log(err)
      }
    });
  },
   //登录
  accountLogin(that,encryptedData,iv,sessionKey){
    wxRequest.hgPostNosession({
      sessionKey:sessionKey,
      encryptedData:encryptedData,
      iv:iv,
      loginType:6,
      platform:'MiniProgram'
    },'user/account/login/v1').then(res=>{
      console.log(res)
      if(res.status===1){
        //设置本地缓存（绑定手机号时重新设置）
        wx.setStorageSync('userId',res.result.userId)
        wx.setStorageSync('ticket',res.result.ticket)
        wx.setStorageSync('openId',res.result.openId)
        wx.setStorageSync('isBoundPhone',res.result.isBoundPhone)
        wx.navigateBack()
        // if(res.result.isBoundPhone===0){
        //   //未绑定手机（再去手机绑定页面授权）
        //   wx.navigateTo({ 
        //     url: "/pages/authorizePhone/index?isGDetail="+that.data.isGDetail+"&productId="+that.data.productId+"&inviteCode="+that.data.inviteCode
        //   })
        // }else{
        //   //已绑定手机，跳转到发首页开始薅羊毛
        //   if(that.data.isGDetail==='1'){
        //     wx.navigateTo({
        //       url: '/pages/gDetail/index?productId='+that.data.productId+"&inviteCode="+that.data.inviteCode,
        //     })
        //   }else{
            
        //   }
        // }
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