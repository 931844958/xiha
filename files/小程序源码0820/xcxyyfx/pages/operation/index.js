var app = getApp();
Page({
  //页面的初始数据
  data: {
    item:[false,false,false,false,false,false,false,false]
  },
  //生命周期函数--监听页面加载
  onLoad: function (options) {},
  //生命周期函数--监听页面初次渲染完成
  onReady: function () {},
  //生命周期函数--监听页面显示
  onShow: function () {},
  toggle(e){
    let index=e.currentTarget.dataset.index
    let item=this.data.item
    for(let i=0;i<item.length;i++){
      if(index==i){
        item[i]=!item[i]
      }
    }
    this.setData({
      item:item
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