var app = getApp();
let wxRequest=require('../../common/wxRequest.js')
Page({
  data:{
    currentGood:null,
    indicatorDots:false,
    product:null,
    inviteCode:'',
    productId:'',
  },
  onLoad(options){
    this.setData({
      productId:options.id || options.productId
    })
    //分享链接中获取邀请码（推荐人邀请码）和产品id 
    if(options.inviteCode){
      this.setData({
        inviteCode:options.inviteCode,
      })
      //分享过来的链接，有邀请码的情况下才发请求
      this.add_record(this,this.data.inviteCode,this.data.productId)
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
    //转发到群
    wx.showShareMenu({
      withShareTicket: true
    })
  },
  //添加分享记录
  add_record(that,inviteCode,productId){
    wxRequest.hgPostNosession({
      inviteCode:inviteCode,
      productId:productId
    },'orderForm/add_record').then(res=>{
      console.log('share_record/add_record')
      console.log(res)
    })
  },
  //获取商品详情
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
              shoutu:[productContent.productDetailsList[0].imagePath],
              commentions:productContent.comments,
              detailImg:productContent.productDetailsList.slice(1)
            }
          })
        }
      }
    })
  },
  toBuyTap(e){
    wx.navigateTo({
      url:"/pages/buy/index?id="+e.currentTarget.dataset.id+"&inviteCode="+this.data.inviteCode
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
    let that=this
    return {
      title: '海狗好药方',
      path: '/pages/products/index',
      success: function(res) {
        console.log('转发成功')
        console.log(res)
        // console.log
        wx.getShareInfo({
          shareTicket: res.shareTickets[0],
          success: function (res) { 
            console.log('转发到群成功')
            console.log(res) 
          }
        })
      },
      fail: function(res) {
        console.log('转发失败')
      }
    }
  }
})