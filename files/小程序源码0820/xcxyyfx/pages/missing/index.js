let wxRequest=require('../../common/wxRequest.js')
Page({
  //页面的初始数据
  data: {
    uploadedImg:'',
    productImg:''
  },
  //生命周期函数--监听页面加载
  onLoad: function (options) {},
  //生命周期函数--监听页面初次渲染完成
  onReady: function () {},
  //生命周期函数--监听页面显示
  onShow: function () {},
    //选择文件(这里是单文件上传)
  chooseImages(){
    let that=this
    wx.chooseImage({    
      //count表示上传张数
      count:1,
      sizeType: ['original', 'compressed'],    
      success: function (res) {  
        console.log(res)
        //文件大小是M
        let fileSize=res.tempFiles[0].size/1024/1024
        if(fileSize>5){
          that.errInput('文件不能大于5M')
        }else{
          let path=res.tempFilePaths[0]
          that.uploadOneFile(that,path)
        }
      }
    })
  },
  //上传单个文件 
  uploadOneFile(that,path){
    this.setData({
      uploadedImg:path
    })
    wx.uploadFile({    
      //url: app.GLOBAL.yyHTTP+'pharmacy/uploadImg',
      url:'https://fish.vilicom.cn/fish_ds_web_test/pharmacy/uploadImg',
      filePath: path,    
      header:{'content-type': 'application/json'},
      name: 'file',
      success: function (res) {   
        let data=JSON.parse(res.data)
        let browsePath=data.result.browsePath
        that.setData({
          productImg:browsePath
        })
        that.errInput('上传成功')
      }
    })    
  },
  suggested_sales(e){
    let options=e.detail.value
    let that=this
    if(options.productName.trim()===''){
      this.errInput('商品名称不能为空')
    }else if(!this.data.uploadedImg){
      this.errInput('商品图片不能为空')
    }else{
      wxRequest.hgPost({
        productName:options.productName,
        phone:options.phone,
        contacts:options.contacts,
        productImg:that.data.productImg,
      },'suggested_sales/check_in','https://fish.vilicom.cn/fish_ds_web_test/').then(res=>{
        console.log(res)
        if(res.status===1){
          that.errInput('感谢您的回馈')
          wx.navigateBack()
        }else{
          that.errInput(res.message)
        }
      })
    }
  },
  errInput(msg){
    wx.showToast({
      title:msg,
      icon:'none',
      duration:3000
    })
  },
  toggleMask(e){
    this.setData({
      maskImageUrl:e.currentTarget.dataset.src,
      maskShow:!this.data.maskShow
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