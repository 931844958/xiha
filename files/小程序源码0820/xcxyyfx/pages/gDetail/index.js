var app = getApp();
let wxRequest=require('../../common/wxRequest.js')
let utils=require('../../common/utils.js')
Page({
  data:{
    currentGood:null,
    product:null,
    inviteCode:'',
    productId:'',
    maskShow:false,
    shareProduct:null,
    userInfo:null,
    ProSliderShow:false
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

    if(wx.getStorageSync('isBoundWeChat')===0){
      //分享的链接，授权用户信息
      wx.navigateTo({
        url: "/pages/authorize/index?isGDetail=1&productId="+this.data.productId+"&inviteCode="+this.data.inviteCode
      })
    }
  },
  toggleProSlider(){
    this.setData({
      ProSliderShow:!this.data.ProSliderShow
    })
  },
  onShow(options){
    this.setData({
      userInfo:wx.getStorageSync('userInfo')
    })
    this.getProductDetails(this,this.data.productId)
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
    //wxRequest.hgGetNosession({productId:id},'product/get_product_details','https://seadog.vilicom.cn/shd_web_test/').then(res=>{
    wxRequest.hgGetNosession({productId:id},'product/getProductDetails','https://fish.vilicom.cn/fish_web/').then(res=>{
      if(res.status===1){
        //let productContent=res.result.productContent
        let productContent=JSON.parse(res.result.productContent)
        let comments=productContent.comments
        for(let i=0;i<comments.length;i++){
          comments[i].crerateTime=utils.formatTime(comments[i].crerateTime,'Y-M-D')
        }
        that.setData({
          product:productContent,
          currentGood:{
            shoutu:[
              productContent.productDetailsList[0].imagePath,
              productContent.productDetailsList[1].imagePath,
              productContent.productDetailsList[2].imagePath,
              productContent.productDetailsList[3].imagePath,
              productContent.productDetailsList[4].imagePath],
            commentions:comments,
            detailImg:productContent.productDetailsList.slice(5)
          }
        })
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
      phoneNumber: '17666143788'
    })
  },
  //button 组件设置属性 open-type="share" 触发事件 
  onShareAppMessage: function (res) {
    console.log(res)
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '海狗好药方',
      path: '/pages/products/index',
      success: function(res) {
        console.log('转发成功')
      },
      fail: function(res) {
        console.log('转发失败')
      }
    }
  }
})