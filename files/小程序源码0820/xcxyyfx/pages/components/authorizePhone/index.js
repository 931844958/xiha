let wxRequest=require('../../../common/wxRequest.js')
Component({
  behaviors: [],
  properties: {
    currentPage:{
      type: String,
      value: ''
    }
  },
  // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
  attached: function(){},
  moved: function(){},
  detached: function(){},
  //页面的初始数据
  data: {},
  methods: {
    //绑定手机
    getPhoneNumber(e){
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
          wxRequest.hgGetNosession({smallProgramCode:res.code},'user/account/miniappsAuthorization').then(res=>{
            console.log(res)
            //获取sessionKey用于解密
            that.getUserInfoBinfPhone(that,encryptedData,iv,res.result.sessionKey)
          })
        }
      });
    },
    //绑定手机号
    getUserInfoBinfPhone(that,encryptedData,iv,sessionKey){
      wxRequest.hgPost({
        sessionKey:sessionKey,
        encryptedData:encryptedData,
        iv:iv
      },'user/account/miniProgramBindingPhone/v1').then(res=>{
        console.log(res)
        if(res.status===1){
          //设置本地缓存（绑定手机号时重新设置）
          wx.setStorageSync('userId',res.result.userId)
          wx.setStorageSync('ticket',res.result.ticket)
          wx.setStorageSync('openId',res.result.openId)
          //绑定手机成功标识符
          wx.setStorageSync('isBoundPhone',res.result.isBoundPhone)
          
          that.triggerEvent('myevent', {}) 
        }
      })
    }
  }
})