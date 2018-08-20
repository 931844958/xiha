let wxRequest=require('../../common/wxRequest.js')
Page({
  //页面的初始数据
  data: {
    userInfo:null
  },
  //生命周期函数--监听页面加载
  onLoad: function (options) {},
  //生命周期函数--监听页面初次渲染完成
  onReady: function () {},
  //生命周期函数--监听页面显示
  onShow: function () {
    let userType=wx.getStorageSync('userType')
    if(userType===1){
      this.pharmacyResultVo(this,'pharmacy/get_info')
    }else if(userType===3){
      this.pharmacyResultVo(this,'channel/get_info')
    }
    this.setData({
      userType:wx.getStorageSync("userType")===1?'药店':'代理',
      userTypeImg:wx.getStorageSync("userType")
    })
  },
  pharmacyResultVo(that,path){
    wxRequest.hgGet({},path,'https://fish.vilicom.cn/fish_ds_web_test/').then(res=>{
      this.setData({
        pharmacyResultVo:res.result.pharmacyResultVo
      })
    })
  },
  //退出登录
  loginout(){
    wxRequest.hgPost({},'userAccount/logout','https://fish.vilicom.cn/fish_ds_web_test/').then(res=>{
      wx.clearStorageSync()
      wx.redirectTo({
        url: "/pages/login/index"
      })
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