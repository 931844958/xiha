var app = getApp();
let wxRequest=require('../../common/wxRequest.js')
Page({
  data:{
    product:null,
    productNum: 1,
    defaulAddress:null,
    productId:'',
    inviteCode:'',
    totalExp:0,
    price:''
  },
  //生命周期函数--监听页面显示
  onShow: function () {
    this.getDefaulAddress(this)
    this.findProductById(this,this.data.productId)
    this.findUserInfo(this)
  },
  onLoad(options){
    console.log("购买页面")
    console.log(options)
    if(options.price){
      this.setData({
        productId:options.id,
        inviteCode:options.inviteCode,
        price:options.price
      })   
    }else{
      this.setData({
        productId:options.id
      })   
    }
  },
  //获取用户抵扣券
  findUserInfo(that){
    wxRequest.hgPost({},'user/account/findUserInfo').then((res)=>{
      if(res.status===1){
        that.setData({
          totalExp:Number(res.result.user.totalExp)
        })
      }
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
          let product=res.data.result.product
          //可能是分享过来的产品（价格已经修改）
          product.price=that.data.price || res.data.result.product.price
          that.setData({
            product:product
          })
          console.log(that.data.product)
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
      console.log("支付：：：：inviteCode")
      console.log(that.data.inviteCode)
      //创建订单
      wxRequest.hgPost({
        items:[{
          productId: that.data.product.id,
          productNumber: that.data.productNum,
          productPrice: that.data.product.price,
        }],
        totalMoney: that.data.product.price*formOption.productNum-that.data.totalExp,
        addressId:formOption.addressId,
        payMode:'1',
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
  errMessage(msg){
    wx.showToast({
      title: msg,
      icon: 'none',
      duration: 3000
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