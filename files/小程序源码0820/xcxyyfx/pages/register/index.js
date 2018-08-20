var app = getApp();
let wxRequest=require('../../common/wxRequest.js')
Page({
  //页面的初始数据
  data: {
    //nav标记值
    navIndex:'0',
    certificateData:[],
    //上传的文件
    files:[],
    //用户手机号
    phone:'',
    maskShow:false
  },
  //生命周期函数--监听页面加载
  onLoad: function (options) { 
    this.get_file_type(this,'pharmacy/get_file_type')
  },
  //生命周期函数--监听页面初次渲染完成
  onReady: function () {},
  //生命周期函数--监听页面显示
  onShow: function () {
    //初始化发送验证码按钮
    this.initAuthCodeBtn()
  },
  errInput(msg){
    wx.showToast({
      title:msg,
      duration:2000,
      icon:'none'
    })
  },
  //药店注册
  ydregister(options){
    let option=options.detail.value
    let that=this
    let authCertificate=this.authCertificate()
    console.log('authCertificate::'+authCertificate)
    // if(option.pharmacyName.trim()===''){
    //   this.errInput('药店名称不能为空')
    // }else if(option.pharmacyAddress.trim()===''){
    //   this.errInput('药店地址不能为空')
    // }else if(option.manager.trim()===''){
    //   this.errInput('店长姓名不能为空')
    // }
    
    if(option.phone.trim()==='' || !(/^1[34578]\d{9}$/.test(option.phone))){
      this.errInput('请输入正确的手机号')
    }else if(option.password.trim()===''){
      this.errInput('登录密码不能为空')
    }else if(option.inviteCode.trim()===''){
      this.errInput('邀请码不能为空')
    }else if(option.authCode.trim()===''){
      this.errInput('验证码不能为空')
    }else if(option.account===''){
      this.errInput('账号不能为空')
    }else if(!authCertificate){
    //}else if(false){
      this.errInput('请上传所有要求证书')
    }else{
      
      wxRequest.hgPostNosession({
        pharmacyName:option.pharmacyName,
        pharmacyAddress:option.pharmacyAddress,
        manager:option.manager,
        phone:option.phone,
        account:option.account,
        password:option.password,
        inviteCode:option.inviteCode,
        authCode:option.authCode,
        // files:[{"imgUrl":"https://youyujiankang.oss-cn-shenzhen.aliyuncs.com/3/20180806154606GXtf.png","type":5},
        // {"imgUrl":"https://youyujiankang.oss-cn-shenzhen.aliyuncs.com/3/20180806154610eSDo.png","type":6},
        // {"imgUrl":"https://youyujiankang.oss-cn-shenzhen.aliyuncs.com/3/20180806154614Jeze.png","type":7},
        // {"imgUrl":"https://youyujiankang.oss-cn-shenzhen.aliyuncs.com/3/20180806154618yupd.png","type":8},
        // {"imgUrl":"https://youyujiankang.oss-cn-shenzhen.aliyuncs.com/3/20180806154622kWkX.png","type":9},
        // {"imgUrl":"https://youyujiankang.oss-cn-shenzhen.aliyuncs.com/3/20180806154626vUoC.png","type":10},
        // {"imgUrl":"https://youyujiankang.oss-cn-shenzhen.aliyuncs.com/3/20180806154631xxIS.png","type":11}],
        files:that.data.files
      },'pharmacy/register','https://fish.vilicom.cn/fish_ds_web_test/','application/json').then(res=>{
        if(res.status===1){
          wx.showToast({
            title:res.message,
            duration:3000,
          })
        }else{
          wx.showToast({
            title:res.message,
            duration:3000,
            icon:'none'
          })
        }
      })
    }
  },
  //代理注册
  dlregister(options){
    let option=options.detail.value
    let that=this
    let authCertificate=this.authCertificate()
    
    if(option.phone.trim()==='' || !(/^1[34578]\d{9}$/.test(option.phone))){
      this.errInput('请输入正确的手机号')
    }else if(option.password.trim()===''){
      this.errInput('登录密码不能为空')
    }else if(option.authCode.trim()===''){
      this.errInput('验证码不能为空')
    }else if(option.account===''){
      this.errInput('账号不能为空')
    }else if(!authCertificate){
    //}else if(false){
      this.errInput('请上传所有要求证书')
    }else{
      
      wxRequest.hgPostNosession({
        phone:option.phone,
        account:option.account,
        password:option.password,
        authCode:option.authCode,
        // files:[{"imgUrl":"https://youyujiankang.oss-cn-shenzhen.aliyuncs.com/3/20180806154606GXtf.png","type":12},
        // {"imgUrl":"https://youyujiankang.oss-cn-shenzhen.aliyuncs.com/3/20180806154610eSDo.png","type":13},
        // {"imgUrl":"https://youyujiankang.oss-cn-shenzhen.aliyuncs.com/3/20180806154614Jeze.png","type":14},
        // {"imgUrl":"https://youyujiankang.oss-cn-shenzhen.aliyuncs.com/3/20180806154618yupd.png","type":15}],
        files:that.data.files
      },'channel/register','https://fish.vilicom.cn/fish_ds_web_test/','application/json').then(res=>{
        if(res.status===1){
          wx.showToast({
            title:res.message,
            duration:3000,
          })
        }else{
          wx.showToast({
            title:res.message,
            duration:3000,
            icon:'none'
          })
        }
      })
    }
  },
  //根据邀请码生成账号
  create_account(that){
    wxRequest.hgGetNosession({
      inviteCode:that.data.inviteCode
    },'pharmacy/create_account','https://fish.vilicom.cn/fish_ds_web_test/').then(res=>{
      if(res.status===1){
        that.setData({
          myAccount:res.result.account
        })
      }else{
        that.errInput(res.message)
      }
      
    })
  },
  //获取药店账号
  bornAccount(){
    if(!this.data.inviteCode || this.data.inviteCode.trim()===''){
      this.errInput('请输入邀请码')
    }else{
      this.create_account(this)
    }
  },
  //获取代理账号
  bornDLaccount(){
    let that=this
    wxRequest.hgGetNosession({},'channel/create_account','https://fish.vilicom.cn/fish_ds_web_test/').then(res=>{
      that.setData({
        myAccount:res.result.account
      })
    })
  },
  phoneInput(e){
    this.setData({
      phone:e.detail.value
    })
  },
  inviteCodeInput(e){
    this.setData({
      inviteCode:e.detail.value
    })
  },
  //验证证书
  authCertificate(){
    let certificateData=this.data.certificateData
    let cerID=[]
    for(let i=0;i<certificateData.length;i++){
      cerID[i]=certificateData[i].id
    }
    let files=this.data.files
    let filesID=[]
    for(let i=0;i<files.length;i++){
      filesID[i]=files[i].type
    }
    //去重之后的file列表
    let fileSet =[...new Set(filesID)]
    console.log(fileSet)
    console.log(cerID)
    //其他证书可以不穿 所以上传的文件 比证书要求少1
    if(fileSet.length===cerID.length || fileSet.length==cerID.length-1){
      return true
    }
    return false
  },
  //获取验证码
  sendAuthCode(){
    if((/^1[34578]\d{9}$/.test(this.data.phone))){
      let that=this
      this.setData({
        authCodeBtnDisable:true
      })
      this.data.authCodeHandler=setInterval(()=>{    
        
        this.setData({
          authCodeTimeCount:--this.data.authCodeTimeCount,
          authCodeTips:'('+this.data.authCodeTimeCount+')s后再发送'
        })
        if(this.data.authCodeTimeCount<1){
          this.initAuthCodeBtn()
        }
      },1000)
      wx.request({
        url: app.GLOBAL.yyHTTP+'user/account/getVerifyCode/v1',
        data: {phone:that.data.phone},
        method: 'GET',
        success: function() {
          that.errInput('已发送')
        }
      })
    }else{
      this.errInput('请输入合法的手机号')
    }
  },
  initAuthCodeBtn(){
    clearInterval(this.data.authCodeHandler)
    this.setData({
      authCodeTips:'发送验证码',
      authCodeBtnDisable:false,
      authCodeTimeCount:60
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
          that.errInput('文件不能大于5M')
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
    let uploadedFile=that.data.files
    
    for(let i=0;i<uploadedFile.length;i++){
      if(id===uploadedFile[i].type){
        that.errInput('请勿重复上传')
        return false
      }
    }
    //显示缩略图，点击放大
    let certificateData=that.data.certificateData
    for(let i=0;i<certificateData.length;i++){
      if(certificateData[i].id==id){
        certificateData[i].currentImg=path
      }
    }
    that.setData({
      certificateData:certificateData
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
          files:[
            ...that.data.files, 
            {
              imgUrl:browsePath,
              type:id
            }
          ]
        })
        console.log(that.data.files)
        that.errInput('上传成功')
      }
    })    
  },
  get_file_type(that,path){
    wxRequest.hgGetNosession({},path,'https://fish.vilicom.cn/fish_ds_web_test/').then(res=>{
      if(res.status===1){
        that.setData({
          certificateData:res.result.fileType
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
  changeNav(e){
    let index=e.currentTarget.dataset.index
    this.setData({
      navIndex:index
    })
    if(index==0){
      this.get_file_type(this,'pharmacy/get_file_type')
    }else if(index==1){
      this.get_file_type(this,'channel/get_file_type')
    }
    this.initAuthCodeBtn()
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