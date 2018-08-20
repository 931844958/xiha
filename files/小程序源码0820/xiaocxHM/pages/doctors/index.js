var app = getApp();
let wxRequest=require('../../common/wxRequest.js')
Page({
  //页面的初始数据
  data: {
    navData:[],
    navIndex:25,
    doctorsList:[],
    currentPage:1
  },
  //生命周期函数--监听页面加载
  onLoad: function (options) {},
  //生命周期函数--监听页面初次渲染完成
  onReady: function () {},
  //生命周期函数--监听页面显示
  onShow: function () {
    this.getTitle(this)
    this.getdoctorList(this,this.data.navIndex)
  },
  getTitle(that){
    wx.request({
      url: app.GLOBAL.hgHTTP+ 'doctor/getTitle',
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      success: function(res){
        if(res.data.status===1){
          let tempData=res.data.result.sdi
          let navData=[]
          for(let i=0;i<tempData.length;i++){
            navData.push({
              name:tempData[i].title,
              id:tempData[i].id
            })
          }
          that.setData({
            navData:navData
          })
        }
      }
    })
  },
  getdoctorList(that,articleId){
    wxRequest.hgGet({
      articleId:articleId,
      currentPage:that.data.currentPage,
      pageSize:12
    },'doctor/getdoctorList').then(res=>{
      if(res.status===1){
        that.setData({
          currentPage:++that.data.currentPage,
          doctorsList:that.data.doctorsList.concat(res.result.userInfos)
        })
        wx.hideLoading()
      }
    })
  },
  //点击导航栏,要初始化数据
  navHandler(e){
    this.setData({
      currentPage:1,
      doctorsList:[],
      navIndex:e.target.dataset.id
    })
    this.getdoctorList(this,this.data.navIndex)
  },
  //生命周期函数--监听页面隐藏
  onHide: function () {},
  //生命周期函数--监听页面卸载
  onUnload: function () {},
  //页面相关事件处理函数--监听用户下拉动作
  onPullDownRefresh: function () {},
  //页面上拉触底事件的处理函数
  onReachBottom: function () {
    this.getdoctorList(this,this.data.navIndex)
  },
  //用户点击右上角分享
  onShareAppMessage: function () {},
})