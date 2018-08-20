var app = getApp();
let wxRequest=require('../../common/wxRequest.js')
Page({
  data:{
    product:null,
    productNum: 1,
    defaulAddress:null,
    productId:'',
    inviteCode:''
  },
  //生命周期函数--监听页面显示
  onShow: function () {
    this.getDefaulAddress(this)
    this.findProductById(this,this.data.productId)
  },
  onLoad(options){
    console.log("购买页面")
    console.log(options)
    this.setData({
      productId:options.id,
      inviteCode:options.inviteCode
    })    
  },
  findProductById(that,id){
    //获取商品信息    
    wx.request({
      url: app.GLOBAL.yyHTTP+'product/findProductById',
      data: {id:id},
      method: 'GET',
      success: function(res){
        if(res.data.status===1){
          that.setData({
            product:res.data.result.product
          })
        }
      }
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
      //创建订单
      wxRequest.hgPost({
        productId: that.data.product.id,
        prodructNum: that.data.productNum,
        totalMoney: that.data.product.price*formOption.productNum, //大于0
        //收货地址id
        addressId:formOption.addressId,
        payMode:'1',
        inviteCode:that.data.inviteCode
      },'orderForm/createOrder').then(res=>{
        if(res.status===1){
          that.unifiedOrder(that,res.result.orderForm)
        }else{
          wx.showToast({
            title: res.message,
            icon: 'none',
            duration: 2000
          })
        }
      })
      
    }
  },
  //发起统一下单
  unifiedOrder(that,orderForm){
    wxRequest.hgPost({
      orderSn:orderForm.orderSn,
      business:0,
      sdkType:5
    },'pay/wechat/unifiedOrder').then(res=>{
      if(res.status===1){
        that.payment(res.result)
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
      url: '/pages/addressAdd/index?isBuy=1&productId='+this.data.productId+'&inviteCode='+this.data.inviteCode
    })
  },
  //验证表单(写的有点low)
  validate(options){
    console.log(options)
    let tmessage=''
    let flag=false
    if(!this.data.defaulAddress){
      tmessage='请添加收货地址'
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