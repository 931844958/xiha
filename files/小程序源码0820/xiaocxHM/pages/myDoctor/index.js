let wxRequest=require('../../common/wxRequest.js')
Page({
  //页面的初始数据
  data: {
    doctors:[],
    //分页默认页
    currentPage:1
  },
  //生命周期函数--监听页面加载
  onLoad: function (options) {},
  //生命周期函数--监听页面初次渲染完成
  onReady: function () {},
  //生命周期函数--监听页面显示
  onShow: function () {
    this.getMyDoctor(this)
  },
  getMyDoctor(that){
    wxRequest.hgGet({
      currentPage:that.data.currentPage,
      pageSize:8
    },'doctor/getMyDoctor').then(res=>{
      if(res.status===1){
        that.setData({
          currentPage:++that.data.currentPage,
          doctors:that.data.doctors.concat(res.result.userInfos)
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
  onReachBottom: function () {
    this.getMyDoctor(this)
  },
  //用户点击右上角分享
  onShareAppMessage: function () {},
})