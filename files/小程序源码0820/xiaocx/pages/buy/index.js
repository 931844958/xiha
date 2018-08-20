var app = getApp();
let wxRequest=require('../../common/wxRequest')
Page({
  data:{
    product:null,
    //省市区地址
    region:['请选择','请选择','请选择'],
    //详细地址
    addressDetail:'',
    userPhone:'',
    productNum: 1,
    productId:''
  },
  onLoad(options){
    //推荐人分享购买
    if(options.recommendUserId&&options.recommendUserId!==''){
      this.setData({
        productId:options.id,
        recommendUserId:options.recommendUserId
      })
    }else{
      this.setData({
        productId:options.id
      })
    }
  },
  onShow(){
    //初始化发送验证码按钮
    this.initAuthCodeBtn()
    this.findProductById(this)
  },
  findProductById(that){
    wxRequest.yyGetNosession({
      id:that.data.productId
    },'product/findProductById').then(res=>{
      if(res.status===1){
        that.setData({
          product:res.result.product
        })
      }
    })
  },
  //选择省市区
  bindRegionChange: function (e) {
    this.setData({
      region: e.detail.value
    })
  },
  //提交表单
  formSubmit(e){
    console.log(e.detail.value)
    let formOption=e.detail.value
    //拼接地址
    formOption.address=this.data.region.join('')+formOption.addressDetail
    let validateFlag=this.validate(formOption)
    if(validateFlag){
      let that=this
     // let userCode=wx.getStorageSync('userCode') //用户code有效期5分钟，这个以后要改
      wx.login({
        success: function(res) {
          //创建订单
          wxRequest.yyPostNosession({
            recommendUserId:that.data.recommendUserId||wx.getStorageSync('userId'),
            productId: that.data.product.id,
            prodructNum: that.data.productNum,
            message: formOption.message,
            totalMoney: that.data.product.price*formOption.productNum, //大于0
            address: formOption.address,
            authCode: formOption.authCode,
            phone: that.data.userPhone,
            userName: formOption.userName,
            smallProgramCode:res.code,
            payMode:'1'
          },'order/create/order/v1').then(res=>{
            if(res.status===1){
              that.unifiedOrder(res.result.orderForm)
            }else{
              wx.showToast({
                title: res.message,
                icon: 'none',
                duration: 2000
              })
            }
          })
        }
      })
    }
  },
  //验证表单(写的有点low)
  validate(options){
    console.log(options)
    let tmessage=''
    let flag=false
    if(options.userName===""){
      tmessage='请输入收货人姓名'
    }else if(options.phone===''){
      tmessage='请输入手机号'
    }else if(options.authCode===''){
      tmessage='请选输入验证码'
    }else if(options.address.indexOf('请选择')!==-1){
      tmessage='请选择收货地址'
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
  },
  //发起统一下单
  unifiedOrder(orderForm){
    let that=this
    wx.login({
      success: function(res) {
        //创建订单
        wxRequest.yyPostNosession({
          orderSn:orderForm.orderSn,
          business:0,
          sdkType:5,
          code:res.code
        },'pay/wechat/unifiedOrder').then(res=>{
          if(res.status===1){
            that.payment(res.result)
          }else{
            wx.showToast({
              title: res.message,
              icon: 'none',
              duration: 2000
            })
          }
        })
      }
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
          icon: 'success',
          duration: 2000
        })
      },
      'fail':function(res){
        console.log(res)
      }
    })
  },
  //获取验证码
  sendAuthCode(){
    let that=this
    if(that.isPhone(that.data.userPhone)){
      this.setData({
        authCodeBtnDisable:true
      })
      this.data.authCodeHandler=setInterval(()=>{    
        
        this.setData({
          authCodeTimeCount:--this.data.authCodeTimeCount,
          authCodeTips:'('+this.data.authCodeTimeCount+')s后再发送'
        })
        if(this.data.authCodeTimeCount<1){
          this.initAuthCodeBtn()
        }
        console.log(this.data.authCodeTimeCount)  
      },1000)
      wx.request({
        url: app.GLOBAL.baseUrl+'user/account/getVerifyCode/'+app.GLOBAL.version,
        data: {phone:that.data.userPhone},
        method: 'GET',
      })
    }else{
      wx.showToast({
        title: '请输入合法的手机号',
        icon: 'none',
        duration: 2000
      })
    }
  },
  initAuthCodeBtn(){
    clearInterval(this.data.authCodeHandler)
    this.setData({
      authCodeTips:'发送验证码',
      authCodeBtnDisable:false,
      authCodeTimeCount:60
    })
  },
  //输入手机号(每个数字都会触发这个事件)
  bindPhoneInput(e){
    this.data.userPhone=e.detail.value
  },
  //验证手机号是否合法
  isPhone(phone) {  
    let myreg = /^[1][3,4,5,7,8,9][0-9]{9}$/;  
    if (!myreg.test(phone)) {  
      return false;  
    } else {  
      return true;  
    }  
  },
  makeMinus(e){
    if(this.data.productNum>1){
      this.setData({
        productNum: --this.data.productNum
      })
    }else{
      this.setData({
        productNum: 1
      })
    }
  },
  makePlus(e){
    this.setData({
      productNum: ++this.data.productNum
    })
  }
})