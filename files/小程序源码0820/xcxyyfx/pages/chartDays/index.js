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
  onLoad: function (options) {
    console.log(options)
    this.setData({
      trId:options.trId
    })
  },
  //生命周期函数--监听页面初次渲染完成
  onReady: function () {},
  //生命周期函数--监听页面显示
  onShow: function () {
    let userType=wx.getStorageSync('userType')
    console.log(userType===1)
    console.log(userType===3)
    //1 药店 3代理
    if(userType===1){
      this.pharmacy_bill(this)
    }else if(userType===3){
      this.channel_bill(this)
    }
  },
  //药店
  pharmacy_bill(that){ 
    wxRequest.hgPost({
      currentPage:that.data.currentPage,
      pageSize:10,
      trId:that.data.trId
    },'pharmacy_bill','https://fish.vilicom.cn/fish_ds_web_test/').then(res=>{
      console.log(res)
      let brokerageFlow=res.result.statement
      for(let i=0;i<brokerageFlow.length;i++){
        brokerageFlow[i].tradeTime=utils.formatTime(brokerageFlow[i].tradeTime,'Y-M-D h:m:s')
      }
      that.setData({
        dataList:brokerageFlow
      })
    })
  },
  //代理
  channel_bill(that){
    wxRequest.hgPost({
      currentPage:that.data.currentPage,
      pageSize:10,
      trId:that.data.trId
    },'channel_bill','https://fish.vilicom.cn/fish_ds_web_test/').then(res=>{
      console.log(res)
      let soresList=res.result.statement
      for(let i=0;i<soresList.length;i++){
        soresList[i].createTime=utils.formatTime(soresList[i].createTime,'Y-M-D h:m:s')
      }
      that.setData({
        dataList:soresList
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