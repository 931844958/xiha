let wxRequest=require('../../common/wxRequest.js')
Page({
  //页面的初始数据
  data: {
    userInfo:null,
    sexData: ['保密', '男', '女'],
    sexIndex:0,
    userid:'',
    //显示下级用户销售记录用到
    money:0,
    maskShow:false,
    maskImageUrl:'',
    //用户文件
    files:[]
  },
  //生命周期函数--监听页面加载
  onLoad: function (options) {},
  //生命周期函数--监听页面初次渲染完成
  onReady: function () {},
  //生命周期函数--监听页面显示
  onShow: function () {

    let userType=wx.getStorageSync('userType')
    if(userType===1){
      this.pharmacyResultVo(this,'pharmacy/get_info')
    }else if(userType===3){
      this.pharmacyResultVo(this,'channel/get_info')
    }
    this.setData({
      userType:wx.getStorageSync("userType")===1?'药店':'代理',
      userTypeImg:wx.getStorageSync("userType")
    })
  },
  //获取用户信息
  pharmacyResultVo(that,path){
    wxRequest.hgGet({},path,'https://fish.vilicom.cn/fish_ds_web_test/').then(res=>{
      if(res.status===1){
        this.setData({
          pharmacyResultVo:res.result.pharmacyResultVo,
          files:res.result.pharmacyResultVo.files
        })
        console.log(that.data.files)
        wx.setStorageSync('pharmacyResultVo', res.result.pharmacyResultVo)
      }else{
        that.errMessage(res.message)
      }
    })
  },
  //选择文件(这里是单文件上传)
  chooseImages(e){
    let that=this
    wx.chooseImage({    
      //count表示上传张数
      count:1,
      sizeType: ['original', 'compressed'],    
      success: function (res) {  
        //文件大小是M
        let fileSize=res.tempFiles[0].size/1024/1024
        if(fileSize>5){
          that.errMessage('文件不能大于5M')
        }else{
          let path=res.tempFilePaths[0]
          let id=e.currentTarget.dataset.id
          that.uploadOneFile(that,path,id)
        }
      }
    })
  },
  //上传单个文件
  uploadOneFile(that,path,id){
    wx.uploadFile({    
      //url: app.GLOBAL.yyHTTP+'pharmacy/uploadImg',
      url:'https://fish.vilicom.cn/fish_ds_web_test/pharmacy/uploadImg',
      filePath: path,    
      header:{'content-type': 'application/json'},
      name: 'file',
      success: function (res) {   
        let browsePath=JSON.parse(res.data).result.browsePath
        let files=that.data.files
        let tempFiles=[]
        for(let i=0;i<files.length;i++){
          if(files[i].id===id){
            files[i].image=browsePath
          }
          tempFiles.push({
            id:files[i].id,
            image:files[i].image
          })
        }
        that.setData({
          files:files
        })
        that.errMessage('上传成功')
        that.data_changes(tempFiles)
      }
    })    
  },
  //修改文件
  data_changes(files){
    wxRequest.hgPostNosession({
      files:files,
      session:{
        userId:wx.getStorageSync('userId'),
        ticket:wx.getStorageSync('ticket')
      }
    },'pharmacy/data_changes','https://fish.vilicom.cn/fish_ds_web_test/','application/json').then(res=>{
      if(res.status===1){
        that.errMessage('修改成功')
      }else{
        that.errMessage(res.message)
      }
    })

  },
  errMessage(msg){
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
  //根据用户id获取用户信息（只能获取下级）
  get_userinfo_by_userid(that,userId){
    wxRequest.hgGet({
      userId:userId
    },'user/get_userinfo_by_userid').then(res=>{
      if(res.status===1){
        let userinfo=res.result.userinfo
        that.setData({
          userInfo:userinfo,
          sexIndex:Number(userinfo.sex)
        })
      }else{
        wx.showToast({
          title:res.message,
          icon:'none',
          duration:3000
        })
      }
      
    })
  },
  //修改性别
  bindPickerChange(e){
    this.setData({
      sexIndex:e.detail.value
    })
    let that=this
    wxRequest.hgPost({
      sex:that.data.sexIndex
    },'user/update_sex').then(res=>{
      if(res.status===1){
        wx.showToast({
          title:res.message,
          duration:3000,
        })
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