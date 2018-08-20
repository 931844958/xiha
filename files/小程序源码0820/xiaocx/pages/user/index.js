var app = getApp();
Page({
  data:{
    userData:null,
    userGrade:null,
    teamData:null,
    circular:true,
    bannerData:[],
    bannerAutoplay:true,
    bannerInterval:5000,
    bannerDuration:500,
    bannerIndicatorDots:false,
    userId:'',
    ticket:'',
  }, 
  onLoad(){
  },
  onShow(){
    this.setData({
      userData:app.GLOBAL.userData,
      userGrade:app.GLOBAL.userGrade,
      userId:wx.getStorageSync("userId"),
      ticket:wx.getStorageSync("ticket")
    })
    this.teacherAndPupil(this)
    this.getBannerList(this)
  },
  getBannerList(that){
    wx.request({
      url: app.GLOBAL.baseUrl+'index/banner/list/v1',
      method: 'GET',
      success: function(res){
        if(res.data.status===1){
          that.setData({
            bannerData:res.data.result.bannerList
          })
        }
      }
    })
  },
  teacherAndPupil(that){
    wx.request({ 
      url: app.GLOBAL.baseUrl+'user/my/teacherAndPupil/v1',
      data: {
        session:JSON.stringify({
          userId:that.data.userId,
          ticket:that.data.ticket
        })
      },
      method: 'GET',
      success: function(res){
        if(res.data.status===1){
          that.setData({
            teamData:res.data.result
          })
        }
      }
    })
  },
  //跳转商品列表
  toProducts(){
    wx.switchTab({
      url:'/pages/products/index'
    })
  },
})