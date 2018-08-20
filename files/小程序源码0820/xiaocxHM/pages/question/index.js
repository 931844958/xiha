let wxRequest=require('../../common/wxRequest.js')
let app = getApp();
Page({
  //页面的初始数据
  data: {
    imagesPaths:[],
    uploadfiles:[],
    descCount:500,
    descLength:0
  },
  //生命周期函数--监听页面加载
  onLoad: function (options) {},
  //生命周期函数--监听页面初次渲染完成
  onReady: function () {},
  //生命周期函数--监听页面显示
  onShow: function () {},
  //提交表单
  formSubmit(e){
    let that=this
    //文字不能为空 图片可以不传
    if(e.detail.value.content.trim()===''){
      wx.showToast({
        title: '请输入描述信息',
        icon:'none',
        duration: 2000
      })
      return;
    }
    wxRequest.hgPost({
      stypes:'3',
      content:e.detail.value.content,
      files:that.data.uploadfiles
    },'problem/addProblem').then(res=>{
      if(res.status===1){
        wx.navigateTo({
          url: "/pages/questioner/index?problemId="+res.result.problemId
        })
      }
    })
  },
  //选择图片
  uploadImage(){
    let that=this
    wx.chooseImage({    
      sizeType: ['original', 'compressed'],    
      success: function (res) {    
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        that.setData({
          imagesPaths:[].concat(res.tempFilePaths)
        })   
        for (let i=0; i < that.data.imagesPaths.length; i++) {    
          wx.uploadFile({    
            url: app.GLOBAL.hgHTTP+'problem/uploadFile',
            filePath: that.data.imagesPaths[i],    
            header:{'content-type': 'application/json'},
            name: 'files',    
            success: function (res) {   
              console.log(res) 
              let DATA=JSON.parse(res.data)
              that.setData({
                uploadfiles:that.data.uploadfiles.concat(DATA.result.attaches[0].id)
              }) 
            }    
          })    
        }
      }    
    })   
  },
  //输入文字
  inputing(e){
    this.setData({
      descLength:e.detail.value.length
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