var app = getApp()
let formatTime=require('../../common/utils.js')
Page({
  data:{
    ordersList:[]
  },
  onLoad(params){
    let that=this
    wx.request({
      url: app.GLOBAL.baseUrl+'order/getMyOrder',
      data: {
        openId:wx.getStorageSync('openId'),
        type:2
      },
      method: 'GET',
      success: function(res){
        if(res.data.status===1){
          let ORDER=res.data.result.orders
          //格式化数据
          for(let i=0;i<ORDER.length;i++){
            ORDER[i].createTime=formatTime.formatTime(ORDER[i].createTime,'Y-M-D h:m:s')
            ORDER[i].payRequestTime=formatTime.formatTime(ORDER[i].payRequestTime,'Y-M-D h:m:s')
          }
          that.setData({
            ordersList:ORDER
          })
        }
      }
    })
  },
  onShow(e){
  }
})