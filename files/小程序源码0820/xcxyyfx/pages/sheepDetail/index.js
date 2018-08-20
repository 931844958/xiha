let wxRequest=require('../../common/wxRequest.js')
let utils=require('../../common/utils.js')
Page({
  //页面的初始数据
  data: {
    clientOrderLiet:[],
    clientName:'',
    amount:'',
    sheepPhone:''
  },
  //生命周期函数--监听页面加载
  onLoad: function (options) {
    console.log(options)
    this.setData({
      sheepPhone:options.phone,
      clientName:options.clientName,
      amount:options.amount,
    })
    this.client_order_liet(this,options.clientId)
  },
  //生命周期函数--监听页面初次渲染完成
  onReady: function () {},
  //生命周期函数--监听页面显示
  onShow: function () {},
  client_order_liet(that,clientId){
    wxRequest.hgGet({
      currentPage:1,
      pageSize:10,
      clientId:clientId
    },'client_order_liet').then(res=>{
      if(res.status===1){
        let clientOrderLiet=res.result.clientOrderLiet
        for(let i=0;i<clientOrderLiet.length;i++){
          clientOrderLiet[i].createTime=utils.formatTime(clientOrderLiet[i].createTime,'Y-M-D')
        }
        this.setData({
          clientOrderLiet:clientOrderLiet
        })
        console.log(this.data.clientOrderLiet)
      }
    })
  },
  makeCall(){
    wx.makePhoneCall({
      phoneNumber: this.data.sheepPhone
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