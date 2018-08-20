var app = getApp();
let wxRequest=require('../../common/wxRequest.js')
Page({
  data:{
    defaulAddress:null,
    inviteCode:'',
  },
  //生命周期函数--监听页面显示
  onShow: function () {
    this.getDefaulAddress(this)
  },
  onLoad(options){
    this.setData({
      inviteCode:options.inviteCode
    })   
  },
  //获取默认地址
  getDefaulAddress(that){
    wxRequest.hgGet({},'user/account/findDefalutAddress').then(res=>{
      if(res.status===1){
        that.setData({
          defaulAddress:res.result.address
        })
      }
    })
  },
  //提交表单
  formSubmit(e){
    let formOption=e.detail.value
    let validateFlag=this.validate(formOption)
    if(validateFlag){
      let that=this
      let items=wx.getStorageSync('pItems')
      //创建订单
      wxRequest.hgPost({
        totalMoney:wx.getStorageSync('totalMoney'),
        items:items,
        message:formOption.message,
        recommend:formOption.recommend,
        addressId:formOption.addressId,
        payMode:'4',
        inviteCode:that.data.inviteCode
      },'create_order','https://seadog.vilicom.cn/shd_web_test/','application/json').then(res=>{
        if(res.status===1){
          that.unifiedOrder(that,res.result.orderVo)
        }else{
          that.errMessage(res.message)
        }
      })
    }
  },
  //发起统一下单
  unifiedOrder(that,orderVo){
    wxRequest.hgPost({
      orderSn:orderVo.orderSn,
      business:0,
      sdkType:5
    },'pay/wechat/unifiedOrder').then(res=>{
      if(res.status===1){
        that.payment(res.result)
      }else{
        that.errMessage(res.message)
      }
    })
  },
  errMessage(msg){
    wx.showToast({
      title: msg,
      icon: 'none',
      duration: 3000
    })
  },
  //发起微信支付
  payment(result){
    wx.requestPayment({
      'nonceStr': result.nonceStr,
      'package': result.package,
      'signType': 'MD5',
      'timeStamp':result.timeStamp+'',
      'paySign': result.sign,
      'success':function(res){
        wx.showToast({
          title: '成功',
          icon: 'success'
        })
        //购买成功之后跳转到首页
        wx.switchTab({
          url: '/pages/home/index',
        })
      },
      'fail':function(res){
        console.log(res)
      }
    })
  },
  goAddressAdd(){
    //添加默认地址，然后跳回来
    wx.navigateTo({
      url: '/pages/addressAdd/index'
    })
  },
  //验证表单(写的有点low)
  validate(options){
    console.log(options)
    let tmessage=''
    let flag=false
    if(!this.data.defaulAddress){
      tmessage='请添加收货地址'
    }else if(options.recommend.trim()===''){
      tmessage='请输入指导老师'
    }else{
      return true
    }
    if(!flag){
      wx.showToast({
        title: tmessage,
        icon: 'none',
        duration: 2000
      })
      return
    }
  }
})