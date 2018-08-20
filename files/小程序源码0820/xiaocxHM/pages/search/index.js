var app = getApp();
Page({
  //页面的初始数据
  data: {
    hotData:['失眠','多梦','易醒','补肾','肾虚','盗汗','美白','祛斑','色斑','藓','痒','脱发','减肥','丰胸'],
    searchText:'',
    //搜索结果展示医生
    doctorsList:[]
  },
  //生命周期函数--监听页面加载
  onLoad: function (options) {},
  //生命周期函数--监听页面初次渲染完成
  onReady: function () {},
  //生命周期函数--监听页面显示
  onShow: function () {},
  getSerachText(e){
    this.setData({
      searchText:e.detail.value
    })
  },
  search(){
    let that=this
    wx.request({
      url: app.GLOBAL.hgHTTP+'doctor/searchByCondition',
      method: 'GET',
      data:{
        keyword:that.data.searchText
      },
      success: function(res){
        if(res.data.status===1){
          that.setData({
            doctorsList:res.data.result.userInfos
          })
        }
      }
    })
  },
  searchHot(e){
    this.setData({
      searchText:e.currentTarget.dataset.text
    })
    this.search()
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