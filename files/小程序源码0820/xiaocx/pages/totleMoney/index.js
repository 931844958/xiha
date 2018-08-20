var app = getApp();
let wxRequest=require('../../common/wxRequest.js')
Page({
  //页面的初始数据
  data: {
    moneyData:null
  },
  //生命周期函数--监听页面加载
  onLoad: function (options) {},
  //生命周期函数--监听页面初次渲染完成
  onReady: function () {},
  //生命周期函数--监听页面显示
  onShow: function () {
    this.extract(this)
  },
  extract(that){
    wxRequest.yyGet({},'user/extract/money/v1').then(res=>{
      if(res.status===1){
        that.setData({
          moneyData:res.result
        })
       // console.log(that.data.moneyData)
      }else{
        wx.showToast({
          title:res.message,
          duration:3000,
          icon:'none'
        })
      }
    })
  },
  formSubmit(e){
    let money=e.detail.value.money
    if(money<30){
      wx.showToast({
        title:'提现金额不能少于30',
        duration:3000,
        icon:'none'
      })
    }else if(money>200){
      wx.showToast({
        title:'提现金额不能多于200',
        duration:3000,
        icon:'none'
      })
    }else{
      this.withdrawDeposit(this,money)
    }
  },
  withdrawDeposit(that,money){
    wxRequest.yyPost({
      money:money
    },'user/withdrawDeposit').then(res=>{
      if(res.status===1){
        wx.showToast({
          title:res.message,
          duration:3000,
        })
      }else{
        wx.showToast({
          title:res.message,
          duration:3000,
          icon:'none'
        })
      }
    })
  },
  copppy(e){
    let data=e.currentTarget.dataset.data
    wx.setClipboardData({
      data:data
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