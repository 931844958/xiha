var app = getApp();
let wxRequest=require('../../common/wxRequest.js')
Page({
  //页面的初始数据
  data: {
    advices:[],
    //分页默认页
    currentPage:1
  },
  //生命周期函数--监听页面加载
  onLoad: function (options) {},
  //生命周期函数--监听页面初次渲染完成
  onReady: function () {},
  //生命周期函数--监听页面显示
  onShow: function () {
    this.getMyProblem(this)
  },
  getMyProblem(that){
    wxRequest.hgGet({
      currentPage:that.data.currentPage,
      pageSize:12
    },'problem/getMyProblem').then(res=>{
      if(res.status===1){
        that.setData({
          currentPage:++that.data.currentPage,
          //advices:res.result.pvs.reverse().concat(that.data.advices)
          advices:that.data.advices.concat(res.result.pvs)
        })
      }
    })
  },
  //删除问题
  delQuestion(e){
    let that=this
    wxRequest.hgPost({
      id:e.target.dataset.id
    },'problem/deleteProblem').then(res=>{
      if(res.status===1){
        that.setData({
          advices:[],
          currentPage:1
        })
        that.getMyProblem(that)
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
    this.getMyProblem(this)
  },
  //用户点击右上角分享
  onShareAppMessage: function () {},
})