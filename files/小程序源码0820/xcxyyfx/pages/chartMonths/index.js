//鱼仔和积分公用
let wxRequest=require('../../common/wxRequest.js')
let utils=require('../../common/utils.js')
Page({
  //页面的初始数据
  data: {
    feature:'',
    currentPage:1,
    dataList:[]
  },
  //生命周期函数--监听页面加载
  onLoad: function (options) {},
  //生命周期函数--监听页面初次渲染完成
  onReady: function () {},
  //生命周期函数--监听页面显示
  onShow: function () {
    this.transfer_list(this)
  },
  //账单
  transfer_list(that){
    wxRequest.hgGetNosession({
      currentPage:that.data.currentPage,
      pageSize:10,
    },'transfer_list','https://fish.vilicom.cn/fish_ds_web_test/').then(res=>{
      console.log(res)
      //transferList
      let brokerageFlow=res.result.transferList
      for(let i=0;i<brokerageFlow.length;i++){
        brokerageFlow[i].createTime=utils.formatTime(brokerageFlow[i].createTime,'Y-M-D h:m:s')
        brokerageFlow[i].endTime=utils.formatTime(brokerageFlow[i].endTime,'Y-M-D h:m:s')
      }
      that.setData({
        dataList:brokerageFlow
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