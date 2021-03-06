var app = getApp();
Page({
  //页面的初始数据
  data: {
    userInfo:null,
    withdrawRecord:[]
  },
  //生命周期函数--监听页面加载
  onLoad: function (options) {
    let withdrawRecord=this.data.withdrawRecord
    let yaoData=['六味地黄膏','龟鹿二仙膏','蛮龙液','参茸蛤蚧保肾丸']
    for(let i=0;i<11;i++){
      withdrawRecord.push({
        createTime:"2018-7-"+Math.floor(Math.random()*30),
        money:Math.floor(Math.random()*400),
        extractFrom:yaoData[Math.floor(Math.random()*4)]
      })
    }
    this.setData({
      userInfo:{
        headImg:options.headImg,
        nickName:options.nickname,
        earnings:Math.floor(Math.random()*10000),
        apprenticeNum:Math.floor(Math.random()*10000),
      },
      withdrawRecord:withdrawRecord
    })
  },
  //生命周期函数--监听页面初次渲染完成
  onReady: function () {},
  //生命周期函数--监听页面显示
  onShow: function () {},
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