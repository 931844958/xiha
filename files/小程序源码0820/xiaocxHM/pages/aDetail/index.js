let formatTime=require('../../common/utils.js')
var WxParse = require('../../wxParse/wxParse.js');
let wxRequest=require('../../common/wxRequest.js')
var app = getApp();
Page({
  //页面的初始数据
  data: {
    aricle:null,
    articleId:'',
    articleType:'',
    commentList:[],
    isTextareaFocus:false,
    textareaValue:'',
    loadFlag:false
  },
  //生命周期函数--监听页面加载
  onLoad: function (options) {
    this.getKnowledge(this,options.articleId,options.articleType)
    this.setData({
      articleId:options.articleId,
      articleType:options.articleType
    })
  },
  //生命周期函数--监听页面初次渲染完成
  onReady: function () {},
  //生命周期函数--监听页面显示
  onShow: function () {
  },
  //获取文章内容
  getKnowledge(that,articleId,articleType){
    wxRequest.hgGet({
      articleType:articleType,
      articleId:articleId
    },'index/index/findKnowById').then(res=>{
      if(res.status===1){
        let aricle=res.result.blobtableList
        aricle.createTime=formatTime.getDateDiff(aricle.createTime)
        WxParse.wxParse('article', 'html', aricle.valuess, that,5);
        that.setData({
          aricle:aricle,
          loadFlag:true
        })
        //评论应该在视频加载之后在加载
        that.getComentList(that,that.data.articleId,that.data.articleType)
      }
    })
  },
  //获取评论
  getComentList(that,articleId,articleType){
    wx.request({
      url: app.GLOBAL.hgHTTP+'index/getComentList',
      method: 'GET',
      data:{
        articleType:articleType,
        articleId:articleId,
        currentPage:1,
        pageSize:8
      },
      success: function(res){
        if(res.data.status===1){
          let commentList=res.data.result.commentList
          for(let i=0;i<commentList.length;i++){
            commentList[i].createTime=formatTime.getDateDiff(commentList[i].crerateTime)
          }
          that.setData({
            commentList:commentList
          })
        }
      }
    })
  },
  //发表评论
  pushContent(e){
    if(e.detail.value.content.trim()!==''){
      this.commenting(this,this.data.articleId,this.data.articleType,e.detail.value.content)
    }
  },
  commenting(that,articleId,articleType,content){
    wxRequest.hgPost({
      businessType:articleType,
      businessId:articleId,
      content:content
    },'index/addComment').then(res=>{
      if(res.status===1){
        //刷新当前页（太陈旧）
        wx.showToast({
          title: '发表成功',
          icon: 'success',
          duration: 2000
        })
        that.setData({
          textareaValue:''
        })
        that.getComentList(that,articleId,articleType)
      }   
    })
    that.setData({
      isTextareaFocus:false
    })
  },
  //点击完成(提交表单??)
  confirming(e){
    this.commenting(this,this.data.articleId,this.data.articleType,e.detail.value)
  },
  //键盘拉起事件
  textareaFocus(e){
    this.setData({
      isTextareaFocus:true
    })
  },
  //键盘收起事件
  textareaBlur(){
    this.setData({
      isTextareaFocus:false
    })
  },
  toHome(){
    wx.switchTab({
      url: "/pages/home/index"
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