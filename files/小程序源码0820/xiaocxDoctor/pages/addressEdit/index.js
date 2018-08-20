var app = getApp();
let wxRequest=require('../../common/wxRequest.js')
Page({
  //页面的初始数据
  data: {
    region:[],
    isDefault:false,
    name:'',
    phone:'',
    detailedAddress:''
  },
  //生命周期函数--监听页面加载
  onLoad: function (options) {
    this.setData({
      addressId:options.id
    })
    this.findUserAddressById(this,options.id)
  },
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
    }else if(options.phone.trim()===''){
      tmessage='请输入手机号'
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
        id:that.data.addressId,
        phone:options.phone,
        area:that.data.region,
        isDefault:that.data.isDefault?'1':'0',
        detailedAddress:options.detailedAddress
      },'user/account/addUserAddress').then(res=>{
        if(res.status===1){
          wx.navigateTo({
            url: '/pages/addressManage/index',
          })
        }
      })
  },
  //删除地址
  delAddress(that){
    wxRequest.hgPost({
        id:that.data.addressId
      },'user/account/delUserAddress').then(res=>{
        if(res.status===1){
          wx.navigateTo({
            url: '/pages/addressManage/index',
          })
        }
      })
  },
  //弹出确认框
  doDelete(){
    let that=this
    wx.showModal({
      title: '提示',
      content: '确认删除？',
      success: function(res) {
        if (res.confirm) {
          that.delAddress(that)
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  findUserAddressById(that,id){
    wxRequest.hgGet({id:id},'user/account/findUserAddressById').then(res=>{
      if(res.status===1){
        let address=res.result.address
        that.setData({
          region:address.area.split(','),
          isDefault:address.isDefault===0?false:true,
          name:address.name,
          phone:address.phone,
          detailedAddress:address.detailedAddress
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