var app = getApp();
let wxRequest=require('../../common/wxRequest.js')
Page({
  //页面的初始数据
  data: {
    date:'',
    isIrritability:0,
    sex:0,
    problemId:0,
    descCount:50,
    descLength:0,
    maskFlag:false,
  },
  bindDateChange: function(e) {
    this.setData({
      date: e.detail.value
    })
  },
  sexradioChange(e){
    this.setData({ 
      sex: e.detail.value
    })
  },
  guoradioChange(e){
    this.setData({
      isIrritability: e.detail.value
    })
  },
  formSubmit(e){
    let that=this
    let formData=e.detail.value
    let pageData=that.data
    if(formData.name.trim()===''){
      wx.showToast({
        title: '请输入姓名',
        icon:'none',
        duration: 2000
      })
      return;
    }else if(formData.birthStr===''){
      wx.showToast({
        title: '请选择出生日期',
        icon:'none',
        duration: 2000
      })
      return;
    }
    
    wxRequest.hgPost({
      problemId:pageData.problemId,
      birthStr:formData.birthStr,
      name:formData.name,
      irritability_conent:formData.irritability_conent,
      weight:formData.weight,
      isIrritability:pageData.isIrritability,
      sex:pageData.sex
    },'problem/addConsultPerson').then(res=>{
      if(res.status===1){
        that.setData({
          maskFlag:true
        })
      }
    })
  },
  //生命周期函数--监听页面加载
  onLoad: function (options) {
    this.setData({
      problemId: options.problemId
    })
  },
    //输入文字
  inputing(e){
    this.setData({
      descLength:e.detail.value.length
    })
  },
  //生命周期函数--监听页面初次渲染完成
  onReady: function () {},
  //生命周期函数--监听页面显示
  onShow: function () {
    if(this.data.maskFlag===true){
      wx.switchTab({
        url:"/pages/home/index"
      })
    }
  },
  //跳转到咨询列表？？（为什么不直接跳过去）
  toSomePage(){
    wx.navigateTo({
      url: '/pages/advices/index',
    })
  },
  //生命周期函数--监听页面隐藏
  onHide: function () {
    this.setData({
      maskFlag:false
    })
  },
  //生命周期函数--监听页面卸载
  onUnload: function () {},
  //页面相关事件处理函数--监听用户下拉动作
  onPullDownRefresh: function () {},
  //页面上拉触底事件的处理函数
  onReachBottom: function () {},
  //用户点击右上角分享
  onShareAppMessage: function () {},
})