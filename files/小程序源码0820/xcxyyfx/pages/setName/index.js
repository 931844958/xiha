let wxRequest=require('../../common/wxRequest.js')
Page({
  //页面的初始数据
  data: {
    realName:''
  },
  //生命周期函数--监听页面加载
  onLoad: function (options) {
    this.setData({
      realName:options.realName
    })
  },
  //生命周期函数--监听页面初次渲染完成
  onReady: function () {},
  //生命周期函数--监听页面显示
  onShow: function () {},
  setOper(e){
    let realName=e.detail.value.realName
    if(realName.trim()===''){
      wx.showToast({
        title:'请输入有效姓名',
        icon:'none'
      })
      return;
    }
    wxRequest.hgPost({
      realName:realName
    },'user/update_real_name').then(res=>{
      if(res.status===1){
        wx.showToast({
          title:res.message,
          duration:3000,
        })
        setTimeout(()=>{
          wx.navigateBack()
        },3000)
      }else{
        wx.showToast({
          title:res.message,
          icon:'none'
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
  onReachBottom: function () {},
  //用户点击右上角分享
  onShareAppMessage: function () {},
})