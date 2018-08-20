//获取应用实例
var app = getApp();
let utils=require('../../common/utils.js')
Page({
  data:{
    extractData:[],
    bannerData:[],
    ProductCase:[],
    //这个可能要放在app.js
    userData:null,
    userGrade:null,
    schedule:0,
    userLoaded:false
  },
  onLoad(){
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
    
    this.setData({
      userLoaded:true
    })
    this.getUserDetail(this)
    this.getBannerList(this)
    this.getExtractList(this)
    this.getProductCase(this)
  },
  //商品详情
  toDetailsTap(e){
    console.log(e.currentTarget.dataset.id)
    wx.navigateTo({
      url:"/pages/gDetail/index?id="+e.currentTarget.dataset.id
    })
  },
  //跳转商品列表
  toProducts(){
    wx.switchTab({
      url:'/pages/products/index'
    })
  },
  getUserDetail(that){
    wx.request({
      url: app.GLOBAL.baseUrl+'user/getUserInfo/v1',
      data:{
        userId:wx.getStorageSync("userId"),
        session:JSON.stringify({
          userId:wx.getStorageSync("userId"),
          ticket:wx.getStorageSync("ticket")
        })
      },
      method: 'GET',
      success: function(res){
        if(res.data.status===1){
          that.setData({
            userData:res.data.result.userInfo,
            schedule:res.data.result.schedule
          })
          let gradeDivide=res.data.result.gradeDivide
          for(let i=0;i<gradeDivide.length;i++){
            if(gradeDivide[i].keyss==that.data.userData.userGrade){
              that.setData({
                userGrade:gradeDivide[i]
              })
            }
          }
          //全局对象(经验、用户信息、等级)
          app.GLOBAL.gradeDivide=gradeDivide
          app.GLOBAL.schedule=that.data.schedule
          app.GLOBAL.userData=that.data.userData
          app.GLOBAL.userGrade=that.data.userGrade
        }
      }
    })
  },
  getBannerList(that){
    wx.request({
      url: app.GLOBAL.baseUrl+'index/banner/list/v1',
      method: 'GET',
      success: function(res){
        if(res.data.status===1){
          let bannerList=res.data.result.bannerList
          //客服，坐享其成，百万计划，怎么赚钱
          bannerList[0].href=''
          bannerList[1].href=''
          bannerList[2].href=''
          bannerList[3].href=''
          that.setData({
            bannerData:bannerList
          })
        }
      }
    })
  },
  getProductCase(that){
    wx.request({
      url: app.GLOBAL.baseUrl+'knowledge/productCase/v1',
      data:{
        articleType:11,
        currentPage:1,
        pageSize:8
      },
      method: 'GET',
      success: function(res){
        if(res.data.status===1){
          that.setData({
            ProductCase:res.data.result.resultantList
          })
        }
      }
    })
  },
  getExtractList(that){
    wx.request({
      url: app.GLOBAL.baseUrl+'/index/extract/list/v1',
      method: 'GET',
      success: function(res){
        if(res.data.status===1){
          let extractData=res.data.result.result
          for(let i=0;i<extractData.length;i++){
            extractData[i].extractTimeFormat=utils.getDateDiff(extractData[i].extractTime)
          }
          that.setData({
            extractData:extractData
          })
        }
      }
    })
  },
  //用户点击右上角分享
  onShareAppMessage() {
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
  },
})