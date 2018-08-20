let wxRequest=require('../../common/wxRequest.js')
let utils=require('../../common/utils.js')
Page({
  //页面的初始数据
  data: {
    currentPage:1,
    dataList:[],
    loadFlag:false,
    oState:0
  },
  //生命周期函数--监听页面加载
  onLoad: function (options) {
    this.setData({
      oState:Number(options.oState)
    })
  },
  //生命周期函数--监听页面初次渲染完成
  onReady: function () {},
  //生命周期函数--监听页面显示
  onShow: function () {
    this.order_center(this)
  },
  order_center(that){
    wxRequest.hgPost({
      state:that.data.oState,
      currentPage:that.data.currentPage,
      pageSize:10
    },'order_center').then(res=>{
      console.log(res)
      let bill=res.result.orders
      for(let i=0;i<bill.length;i++){
        bill[i].createTime=utils.formatTime(bill[i].createTime,'Y-M-D h:m:s')
      }
      that.setData({
        loadFlag:true,
        currentPage:++that.data.currentPage,
        dataList:that.data.dataList.concat(bill)
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
  onReachBottom: function () {
    if(this.data.currentPage===1){
      this.data.currentPage=2
    }
    this.bill(this)
  },
  //用户点击右上角分享
  onShareAppMessage: function () {},
})