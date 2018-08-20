let wxRequest=require('../../common/wxRequest.js')
var app = getApp();
Page({
  //页面的初始数据
  data: {
    //加载产品组件的时机
    userLoaded:false,
    //搜索关键字
    keywords:''
  },
  //生命周期函数--监听页面加载
  onLoad: function (options) {
    console.log(options)
    options.inviteCode='DSHKEO'
    if(options.inviteCode){
      wx.setStorageSync('inviteCode', options.inviteCode)
      
    }
  },
  //生命周期函数--监听页面初次渲染完成
  onReady: function () {},
  //生命周期函数--监听页面显示
  onShow: function () {
    //是否已经授权
    if(wx.getStorageSync('userId')===''){
      //获取授权用户信息
      wx.navigateTo({
        url: "/pages/authorize/index"
      })
      return;
    }

    let inviteCode=wx.getStorageSync('inviteCode')
    if(inviteCode){
      this.bind_referees(this,inviteCode)
    }
  },
  toH5(e){
    wx.navigateTo({
      url: '/pages/h5/index?src='+e.currentTarget.dataset.src
    })
  },
  //根据邀请码绑定邀请人
  bind_referees(that,code){
    wxRequest.hgPost({
      inviteCode:code
    },'user/account/bind_referees').then(res=>{
      //邀请码不正确怎么办，重复绑定则能搞
      console.log(res)
    })
  },
  searchInput(e){
    this.setData({
      keywords:e.detail.value
    })
  },
  toProduct(e){
    if(this.data.keywords && this.data.keywords.trim()){
      let KEYWORDS=this.data.keywords
      this.setData({
        keywords:''
      })
      wx.navigateTo({
        url: `/pages/products/index?keywords=${KEYWORDS}`
      })
    }else{
      let id=e.currentTarget.dataset.id
      wx.navigateTo({
        url: `/pages/products/index?catalogQuery=${id}`
      })
    }
  },
  //生命周期函数--监听页面隐藏
  onHide: function () {},
  //生命周期函数--监听页面卸载
  onUnload: function () {},
  //页面相关事件处理函数--监听用户下拉动作
  onPullDownRefresh: function () {},
  //页面上拉触底事件的处理函数
  onReachBottom: function () {},
  //用户点击右上角分享
  onShareAppMessage: function () {},
})