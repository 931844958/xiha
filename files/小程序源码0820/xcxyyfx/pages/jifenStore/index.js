var app = getApp();
let wxRequest=require('../../common/wxRequest.js')
Page({
  //页面的初始数据
  data: {
    jifenMall:[],
    pharmacyResultVo:null
  },
  //生命周期函数--监听页面加载
  onLoad: function (options) {},
  //生命周期函数--监听页面初次渲染完成
  onReady: function () {},
  //生命周期函数--监听页面显示
  onShow: function () {
    this.getJifen(this)
    //获取用户信息
    let userType=wx.getStorageSync('userType')
    if(userType===1){
      this.pharmacyResultVo(this,'pharmacy/get_info')
    }else if(userType===3){
      this.pharmacyResultVo(this,'channel/get_info')
    }
  },
  getJifen(that){
    wx.request({
      url: app.GLOBAL.yyHTTP+'integral/list/v1',
      data: {
        session:JSON.stringify({
          userId:wx.getStorageSync('userId'),
          ticket:wx.getStorageSync('ticket')
        })
      },
      method: 'GET',
      success: function(res){
        if(res.data.status===1){
          let malls=res.data.result.malls
          //测试stock为0的情况
          // for(let i=0;i<malls.length;i++){
          //   malls[i].stock=0
          // }
          that.setData({
            jifenMall:malls
          })
        }
      }
    })
  },
  pharmacyResultVo(that,path){
    wxRequest.hgGet({},path,'https://fish.vilicom.cn/fish_ds_web_test/').then(res=>{
      let pharmacyResultVo=res.result.pharmacyResultVo
      pharmacyResultVo.totalScore=pharmacyResultVo.totalScore||0
      this.setData({
        pharmacyResultVo:pharmacyResultVo
      })
      wx.setStorageSync('pharmacyResultVo', pharmacyResultVo)
    })
  },
  exchange(e){
    wx.showToast({
      title:`还差${e.currentTarget.dataset.jifen-this.data.pharmacyResultVo.totalScore}积分才能兑换`,
      icon:'none'
    })
  },
  exchangeHis(){
    wx.showToast({
      title:'暂无兑换记录',
      icon:'none'
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