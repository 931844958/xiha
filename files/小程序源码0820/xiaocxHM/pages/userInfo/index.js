let wxRequest=require('../../common/wxRequest.js')
Page({
  //页面的初始数据
  data: {
    userData:null
  },
  //生命周期函数--监听页面加载
  onLoad: function (options) {},
  //生命周期函数--监听页面初次渲染完成
  onReady: function () {},
  //生命周期函数--监听页面显示
  onShow: function () {
    this.findUserInfo(this)
  },
  findUserInfo(that){
    wxRequest.hgGet({},'user/account/findUserInfo').then(res=>{
      if(res.status===1){
        let userData=res.result.user
        userData.phone=userData.phone.slice(0,3)+'********'
        that.setData({
          userData:userData
        })
      }
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