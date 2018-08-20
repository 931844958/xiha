let wxRequest=require('../../common/wxRequest.js')
Page({
  //页面的初始数据
  data: {
    caseIndex:1,
    detailList:[]
  },
  //生命周期函数--监听页面加载
  onLoad: function (options) {},
  //生命周期函数--监听页面初次渲染完成
  onReady: function () {},
  //生命周期函数--监听页面显示
  onShow: function () {
    this.getUserDetail(this)
    this.teamMarketCase(this)
    this.recommends(this,1)
  },
  getUserDetail(that){
    wxRequest.yyGet({
      userId:wx.getStorageSync("userId")
    },'user/getUserInfo/v1').then(res=>{
      if(res.status===1){
        that.setData({
          userData:res.result.userInfo,
        })
        //console.log(that.data.userData)
      }
    })
  },
  recommends(that,recordType){
    wxRequest.yyPost({
      recordType:recordType,
      currentPage:1,
      pageSize:10
    },'user/the/team/recommends/v1').then(res=>{
      if(res.status===1){
        let detailList=res.result.detailList
        that.setData({
          detailList:detailList
        })
      }
    })
  },
  changeTab(e){
    let index=e.currentTarget.dataset.index
    this.setData({
      caseIndex:Number(index)
    })
    this.recommends(this,index)
  },
  teamMarketCase(that){
    wxRequest.yyGet({},'user/teamMarketCase/v1').then(res=>{
      if(res.status===1){
        that.setData({
          teamMarketCase:res.result
        })
      }
    })
  },
  //跳转商品列表
  toProducts(){
    wx.switchTab({
      url:'/pages/products/index'
    })
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