let utils=require('../../common/utils.js')
let wxRequest=require('../../common/wxRequest')
Page({
  //页面的初始数据
  data: {
    prenticeList:[],
    masterUser:null,
    teamSaleroom:0
  },
  //生命周期函数--监听页面加载
  onLoad: function (options) {},
  //生命周期函数--监听页面初次渲染完成
  onReady: function () {},
  //生命周期函数--监听页面显示
  onShow: function () {
    this.teacherAndPupil(this)
  },
  teacherAndPupil(that){
    wxRequest.yyGet({},'user/my/teacherAndPupil/v1').then((res)=>{
      if(res.status===1){
        let result=res.result
        let prenticeList=res.result.prenticeList
        for(let i=0;i<prenticeList.length;i++){
          prenticeList[i].createTime=utils.formatTime(prenticeList[i].createTime,'Y-M-D')
          prenticeList[i].lastLoginTime=utils.formatTime(prenticeList[i].createTime,'Y-M-D')
        }
        that.setData({
          prenticeList:prenticeList,
          masterUser:result.masterUser,
          teamSaleroom:result.teamSaleroom
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