let formatTime=require('../../common/utils.js')
let wxRequest=require('../../common/wxRequest.js')
Page({
  //页面的初始数据
  data: {
    orderList:[],
    currentPage:1
  },
  //生命周期函数--监听页面加载
  onLoad: function (options) {
    this.getMyOrder(this)
  },
  //生命周期函数--监听页面初次渲染完成 
  onReady: function () {},
  //生命周期函数--监听页面显示
  onShow: function () {
      
  },
  getMyOrder(that){
    wxRequest.hgGet({
      currentPage:that.data.currentPage,
      pageSize:10
    },'user/account/getMyOrder').then(res=>{
      if(res.status===1){
        let orderForms=res.result.orderForms
        for(let i=0;i<orderForms.length;i++){
          orderForms[i].payEndTime=formatTime.formatTime(orderForms[i].payEndTime,'Y-M-D h:m:s')
        }
        that.setData({
          currentPage:++that.data.currentPage,
          orderList:that.data.orderList.concat(orderForms)
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
    this.getMyOrder(this)
  },
  //用户点击右上角分享
  onShareAppMessage: function () {},
})