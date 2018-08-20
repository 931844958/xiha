var app = getApp();
let wxRequest=require('../../common/wxRequest.js')
Page({
  data:{
    currentGood:null,
    product:null,
    inviteCode:'',
    productId:'',
    price:''
  },
  onLoad(options){
    console.log(options)
    //options.inviteCode="KYUQCL;1333"
    this.setData({
      productId:options.id || options.productId
    })
    //分享链接中获取邀请码（推荐人邀请码）和产品id
    if(options.inviteCode){
      if(options.price){
        this.setData({
          inviteCode:options.inviteCode,
          price:options.price,
        })
      }else{
        let inviteCode_price=options.inviteCode
        this.setData({
          inviteCode:inviteCode_price.split(';')[0],
          price:inviteCode_price.split(';')[1],
        })
      }
      //分享过来的链接，有邀请码的情况下才发请求
      this.add_record(this,this.data.inviteCode,this.data.productId,this.data.price)
    }

    if(wx.getStorageSync('userId')===''){
      //分享的链接，授权用户信息
      wx.navigateTo({
        url: "/pages/authorize/index"
      })
    }
  },
  
  onShow(options){
    this.getProductDetails(this,this.data.productId)
  },
  //添加分享记录
  add_record(that,inviteCode,productId,price){
    wx.request({
      url: 'https://seadog.vilicom.cn/shd_web_test/product/get_product_details',
      data: {
        inviteCode:inviteCode,
        productId:productId,
        price:price
      },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header:{'content-type': 'application/x-www-form-urlencoded'},
      success: function(res){
        console.log('share_record/add_record')
        console.log(res)
      },
      fail: function() {
        // fail
      }
    })
  },
  getProductDetails(that,id){
    wx.showToast({
      title: '加载中',
      icon: 'loading'
    })
    //获取商品详情
    wx.request({
      url: app.GLOBAL.yyHTTP+'product/getProductDetails',
      data: {productId:id},
      method: 'GET',
      success: function(res){
        wx.hideToast()
        if(res.data.status===1){
          let productContent=JSON.parse(res.data.result.productContent)
          that.setData({
            product:productContent,
            currentGood:{
              shoutu:[
                productContent.productDetailsList[0].imagePath,
                productContent.productDetailsList[1].imagePath,
                productContent.productDetailsList[2].imagePath,
                productContent.productDetailsList[3].imagePath,
                productContent.productDetailsList[4].imagePath,
              ],
              commentions:productContent.comments,
              detailImg:productContent.productDetailsList.slice(5)
            }
          })
        }
      }
    })
  },
  //加入购物车
  addToShopCar(){
    let currentPid=this.data.productId
    let pItems=wx.getStorageSync('pItems') || []
    if(pItems && pItems.length>0){
      for(let i=0;i<pItems.length;i++){

      //购物车已经存在该商品
        if(currentPid==pItems[i]){
          wx.showToast({
            title:'请勿重复添加',
            icon:'none'
          })
          break
        }else{
          this.setPstorage(pItems)
          break
        }
      }
    }else{
      this.setPstorage(pItems)
    }
  },
  setPstorage(arr){
    wx.showToast({
      title:'添加成功'
    })
    // arr.push({
    //   productId:this.data.product.id,
    //   productNumber:1,
    //   productPrice:this.data.product.price
    // })
    arr.push(this.data.product.id)
    wx.setStorageSync('pItems', arr)
  },
  toShopCar(){
    let pItems=wx.getStorageSync('pItems')
    if(!pItems || pItems.length===0){
      wx.showToast({
        title:'您还未添加任何商品',
        icon:'none'
      })
      return;
    }
    wx.navigateTo({
      url: '/pages/shopCar/index'
    })
  },
  toBuyTap(e){
    wx.navigateTo({
      url:`/pages/buy/index?id=${this.data.productId}&inviteCode=${this.data.inviteCode}&price=${this.data.price}`
    })
  },
  makeCall(){
    wx.makePhoneCall({
      phoneNumber: '0755-36633038'
    })
  },
  //button 组件设置属性 open-type="share" 触发事件
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '有鱼健康互助',
      path: `/pages/home/index?inviteCode=${wx.getStorageSync('inviteCode')}`,
      success: function(res) {
        console.log('转发成功')
      },
      fail: function(res) {
        console.log('转发失败')
      }
    }
  }
})