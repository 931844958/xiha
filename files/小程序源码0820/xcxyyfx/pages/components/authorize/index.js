let wxRequest=require('../../../common/wxRequest.js')
Component({
  behaviors: [],
  properties: {
    currentPage:{
      type: String,
      value: ''
    }
  },
  attached: function(){},
  moved: function(){},
  detached: function(){},
  //页面的初始数据
  data: {},
  methods: {
    bindGetUserInfo(e){
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
          wxRequest.hgGetNosession({smallProgramCode:res.code},'userAccount/miniappsAuthorization').then(res=>{
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
      wxRequest.hgPost({
        sessionKey:sessionKey,
        encryptedData:encryptedData,
        iv:iv,
        loginType:6,
        platform:'miniProgram'
      },'userAccount/bindingMobileWechat').then(res=>{
        console.log(res)
        if(res.status===1){
          //设置本地缓存（绑定手机号时重新设置）
          wx.setStorageSync('userId',res.result.userId)
          wx.setStorageSync('ticket',res.result.ticket)
          wx.setStorageSync('openId',res.result.openId)
          wx.setStorageSync('isBoundWeChat',1)
          wx.switchTab({
            url: '/pages/home/index'
          })
        }else{
          //最长七个字
          wx.showToast({
            //title:'请联系客服',
            title:res.message,
            duration:3000,
            icon:'none',
          })

        }
      })
    }
  }
})