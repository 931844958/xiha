var app = getApp();
let wxRequest=require('../../common/wxRequest.js')
Page({
  //页面的初始数据
  data: {
    region:['请选择','请选择','请选择'],
    isDefault:false,
  },
  //生命周期函数--监听页面加载
  onLoad: function (options) {},
  //生命周期函数--监听页面初次渲染完成
  onReady: function () {},
  //生命周期函数--监听页面显示
  onShow: function () {},
  saveAddress(e){
    let options=e.detail.value
    let that=this
    //表单验证
    let flag=true
    let tmessage=''
    if(options.name.trim()===''){
      tmessage='请输入联系人姓名'
    }else if(!(/^1[34578]\d{9}$/.test(options.phone))){
      tmessage='请输入正确的手机号'
    }else if(that.data.region.join(',').indexOf('选择')!==-1){
      tmessage='请选择地区'
    }else if(options.detailedAddress.trim()===''){
      tmessage='请输入详细地址'
    }else{
      flag=false
    }
    if(flag){
      wx.showToast({
        title: tmessage,
        icon: 'none',
        duration: 2000
      })
      return;
    }

    wxRequest.hgPost({
      name:options.name,
      phone:options.phone,
      area:that.data.region,
      isDefault:that.data.isDefault?'1':'0',
      detailedAddress:options.detailedAddress,
    },'user/account/addUserAddress').then(res=>{
      if(res.status===1){
        wx.showToast({
          title:res.message,
          duration:3000
        })
        wx.navigateBack()
      }else{
        wx.showToast({
          title:res.message,
          icon:'none',
          duration:3000
        })
      }
    })
  },
  //是否选择默认
  isDefaultChange(){
    this.setData({
      isDefault:!this.data.isDefault
    })
  },
  //选择省市区
  bindRegionChange: function (e) {
    this.setData({
      region: e.detail.value
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