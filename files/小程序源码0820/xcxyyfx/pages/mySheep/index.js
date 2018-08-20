let wxRequest=require('../../common/wxRequest.js')
Page({
  //页面的初始数据
  data: {
    clientList:[]
  },
  //生命周期函数--监听页面加载
  onLoad: function (options) {},
  //生命周期函数--监听页面初次渲染完成
  onReady: function () {},
  //生命周期函数--监听页面显示
  onShow: function () {
    this.my_client(this)
  },
  my_client(that){
    wxRequest.hgGet({
      currentPage:1,
      pageSize:10
    },'pharmacy/my_customers','https://fish.vilicom.cn/fish_ds_web_test/').then(res=>{
      if(res.status===1){
        this.setData({
          clientList:res.result.clients
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