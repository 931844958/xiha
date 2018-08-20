var app = getApp();
let wxRequest=require('../../common/wxRequest.js')
Page({
  //页面的初始数据
  data: {
    adviceData:[],
    docData:null,
    problemId:'',
    contentValue:''
  },
  //生命周期函数--监听页面加载
  onLoad: function (options) {
    this.setData({
      problemId:options.id
    })
    this.findProblemById(this,options.id)
  },
  //生命周期函数--监听页面初次渲染完成
  onReady: function () {},
  //生命周期函数--监听页面显示
  onShow: function (options) {},
  findProblemById(that,id){
    wxRequest.hgGet({id:id},'problem/findProblemById').then(res=>{
      if(res.status===1){
        let problems=res.result.problems.problems
        let userInfo=res.result.problems.userInfo
        that.setData({
          adviceData:problems,
          docData:userInfo,
        })
      }
    })
  },
  pushContent(e){
    //新增问题
    if(e.detail.value.content.trim()!==''){
      this.commenting(this,this.data.problemId,e.detail.value.content)
    }
  },
  commenting(that,parentId,content){
    wxRequest.hgPost({
      parentId:parentId,
      content:content
    },'problem/appendProblem').then(res=>{
      if(res.status===1){
        wx.showToast({
          title: '提问成功',
          icon: 'success'
        })
        that.setData({
          contentValue:''
        })
        //重新获取数据
        that.findProblemById(that,parentId)
      }else if(res.status===0){
        //别人没有回复，不能再次提问
        wx.showToast({
          title: res.message
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