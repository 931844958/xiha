let utils=require('../../common/utils.js')
let wxRequest=require('../../common/wxRequest')
Page({
  data:{
    currentGood:null,
    product:null,
    productId:'',
    recommendUserId:''
  },
  onLoad(options){
    //推荐人分享购买
    if(options.recommendUserId && options.recommendUserId!==''){
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
    if(wx.getStorageSync('userId')===''){
      //获取授权用户信息
      wx.navigateTo({
        url: "/pages/authorize/index"
      })
      return;
    }
    // console.log(wx.getStorageSync('isBoundPhone'))
    // console.log(typeof wx.getStorageSync('isBoundPhone'))
    if(!wx.getStorageSync('isBoundPhone') || wx.getStorageSync('isBoundPhone')===0){
      //绑定电话号
      wx.navigateTo({
        url: "/pages/authorizePhone/index"
      })
      return;
    }
    this.getProductDetails(this)
  },
  getProductDetails(that){
    wxRequest.yyGetNosession({
      productId:that.data.productId
    },'product/getProductDetails').then((res)=>{
      if(res.status===1){
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
              productContent.productDetailsList[4].imagePath,
            ],
            commentions:comments,
            detailImg:productContent.productDetailsList.slice(5)
          }
        })
      }
    })
  },
  toBuyTap(e){
    let that=this
    if(this.data.recommendUserId && this.data.recommendUserId!==''){
      wx.navigateTo({
        url:`/pages/buy/index?id=${that.data.productId}&recommendUserId=${that.data.recommendUserId}`
      })
    }else{
      wx.navigateTo({
        url:`/pages/buy/index?id=${that.data.productId}`
      })
    }
    
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