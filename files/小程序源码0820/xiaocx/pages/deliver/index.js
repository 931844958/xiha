var app = getApp()
Page({
  data:{
    deliverList:[]
  },
  onLoad(params){
    let that=this
    wx.request({
      url: app.GLOBAL.baseUrl+'order/getWuliuItem',
      data: {
        openId:wx.getStorageSync('openId'),
        state:params.state,
        type:2
      },
      method: 'GET',
      success: function(res){
        if(res.data.status===1){
          that.setData({
            deliverList:res.data.result.items
          })
        }
      }
    })
  },
  onShow(e){
  }
})