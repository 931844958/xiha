let wxRequest=require('../../common/wxRequest.js')
Page({
  //页面的初始数据
  data: {
    productList:[],
    totleMoney:0,
    totleNum:0,
    selectAllFlag:true,
    //是否使用抵扣券
    useFavo:false,
    //地址
    defaulAddress:null,
  },
  //生命周期函数--监听页面加载
  onLoad: function (options) {
    //是否已经授权
    if(wx.getStorageSync('userId')===''){
      //获取授权用户信息
      wx.navigateTo({
        url: "/pages/authorize/index"
      })
      return;
    }
  },
  //生命周期函数--监听页面初次渲染完成
  onReady: function () {},
  //生命周期函数--监听页面显示
  onShow: function () {
    console.log("购买onShow....")
    //inviteCode是否一定存在，inviteCode有效期如何计算
    this.setData({
      inviteCode:wx.getStorageSync('inviteCode'),
    })  
    this.getAllProduct(this)
    this.get_pharmacy_info(this.data.inviteCode)
    this.getDefaulAddress(this)
  },
  getAllProduct(that){
    //先获取所有商品，然后再对比本地购物车记录中存在的商品
    wxRequest.hgPost({},'product/get_product_list').then(res=>{
      let shopCarProduct=that.filterOriginGood(res.result.productList,wx.getStorageSync('pItems'))
      
      // productList.filter(p=>{
      //   pItems.filter(pi=>{
      //     if(p.id == pi){
      //       shopCarProduct.push(p)
      //     }
      //   })
      // })
      for(let i=0;i<shopCarProduct.length;i++){
        shopCarProduct[i].checked=true
        shopCarProduct[i].NUM=1
      }
      that.setData({
        totleMoney:this.counterPrice(shopCarProduct),
        totleNum:this.counterNum(shopCarProduct),
        productList:shopCarProduct
      })
    })
  },
  filterOriginGood(p1,p2){
    let items=[]
    p1.filter(p=>{
      p2.filter(pi=>{
        if(p.id == pi){
          items.push(p)
        }
      })
    })
    return items
  },
  //选择商品
  selectGood(e){
    let id=e.currentTarget.dataset.id
    let productList=this.data.productList
    let index=this.filterArrById(productList,id)
    productList[index].checked=!productList[index].checked
    let toggleSelectAll=this.toggleSelectAll(productList)
    this.setData({
      totleMoney:this.counterPrice(productList),
      totleNum:this.counterNum(productList),
      productList:productList,
      selectAllFlag:toggleSelectAll
    })
  },
  //根据id获取商品index
  filterArrById(arr,id){
    let index
    for(let i=0;i<arr.length;i++){
      if(arr[i].id===id){
        index=i
        break
      }
    }
    return index
  },
  //切换全选，全不选
  toggleSelectAll(pList){
    let selectAllFlag=pList.some((p)=>{
      return p.checked===false
    })
    return !selectAllFlag
  },
  //删除商品
  delateGood(e){
    let id=e.currentTarget.dataset.id
    let productList=this.data.productList
    let index=this.filterArrById(productList,id)
    productList.splice(index,1)
    this.removeArrPitem(id)
    let toggleSelectAll=this.toggleSelectAll(productList)
    this.setData({
      totleMoney:this.counterPrice(productList),
      totleNum:this.counterNum(productList),
      productList:productList,
      selectAllFlag:toggleSelectAll
    })
  },
  //删除本地缓存数组中的某个元素
  removeArrPitem(id){
    let pItems= wx.getStorageSync('pItems')
    for(let i=0;i<pItems.length;i++){
      if(pItems[i]===id){
        pItems.splice(i,1)
        break
      }
    }
    wx.setStorageSync('pItems',pItems)
  },
  //加减
  minusPlus(e){
    let id=e.currentTarget.dataset.id
    let flag=e.currentTarget.dataset.flag
    let productList=this.data.productList
    let index=this.filterArrById(productList,id)
    for(let i=0;i<productList.length;i++){
      if(i===index){
        productList[i].NUM=(flag?++productList[i].NUM:productList[i].NUM===1?productList[i].NUM:--productList[i].NUM)
        break
      }
    }
    this.setData({
      totleMoney:this.counterPrice(productList),
      totleNum:this.counterNum(productList),
      productList:productList
    })
  },
  //全选(全不选)
  selectAll(){
    let selectAllFlag=!this.data.selectAllFlag
    let productList=this.data.productList
    for(let i=0;i<productList.length;i++){
      productList[i].checked=selectAllFlag
    }
    this.setData({
      totleMoney:this.counterPrice(productList),
      totleNum:this.counterNum(productList),    
      selectAllFlag:selectAllFlag,
      productList:productList
    })
  },
  counterNum(arr){
    let num=0
    for(let i=0;i<arr.length;i++){
      if(arr[i].checked){
        num+=arr[i].NUM
      }
    }
    return num
  },
  counterPrice(arr){
    let price=0
    for(let i=0;i<arr.length;i++){
      if(arr[i].checked){
        price+=arr[i].NUM*arr[i].price
      }
    }
    return price
  },
  //缓存选中的商品
  setStorageItems(arr){
    let items=[]
    for(let i=0;i<arr.length;i++){
      if(arr[i].checked){
        items.push({
          productId:arr[i].id,
          productNumber:arr[i].NUM,
          productPrice:arr[i].price
        })
      }
    }
    wx.setStorageSync('pItems', items)
  },
  radioChange(e){
    this.setData({
      useFavo:!this.data.useFavo
    })
  },
  //根据药店邀请码获取要点信息
  get_pharmacy_info(inviteCode){
    wxRequest.hgGetNosession({
      inviteCode:inviteCode
    },'pharmacy/get_pharmacy_info','https://fish.vilicom.cn/fish_ds_web_test/').then(res=>{
      if(res.status===1){
        this.setData({
          pharmacyData:res.result
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
  //获取默认地址
  getDefaulAddress(that){
    wxRequest.hgGet({},'user/account/findDefalutAddress').then(res=>{
      if(res.status===1){
        that.setData({
          defaulAddress:res.result.address
        })
      }
    })
  },
  //提交表单
  formSubmit(e){
    let formOption=e.detail.value
    let validateFlag=this.validate(formOption)
    if(validateFlag){
      let that=this
      let items=this.filterGood(this.data.productList,wx.getStorageSync('pItems'))
      let totalMoney=0
      for(let i=0;i<items.length;i++){
        totalMoney+=items[i].productNumber*items[i].productPrice
      }
      //创建订单
      wxRequest.hgPost({
        totalMoney:totalMoney,
        items:items,
        message:formOption.message,
        recommend:formOption.recommend,
        addressId:formOption.addressId,
        payMode:'4',
        inviteCode:that.data.inviteCode
      },'create_order','https://seadog.vilicom.cn/shd_web_test/','application/json').then(res=>{
        if(res.status===1){
          that.unifiedOrder(that,res.result.orderVo)
        }else{
          that.errMessage(res.message)
        }
      })
    }
  },
  filterGood(p1,p2){
    let items=[]
    p1.filter(p=>{
      p2.filter(pi=>{
        if(p.checked && p.id == pi){
          items.push({
            productId:p.id,
            productNumber:p.NUM,
            productPrice:p.price
          })
        }
      })
    })
    return items
  },
  //发起统一下单
  unifiedOrder(that,orderVo){
    wxRequest.hgPost({
      orderSn:orderVo.orderSn,
      business:0,
      sdkType:5
    },'pay/wechat/unifiedOrder').then(res=>{
      if(res.status===1){
        that.payment(res.result)
      }else{
        that.errMessage(res.message)
      }
    })
  },
  errMessage(msg){
    wx.showToast({
      title: msg,
      icon: 'none',
      duration: 3000
    })
  },
  //发起微信支付
  payment(result){
    wx.requestPayment({
      'nonceStr': result.nonceStr,
      'package': result.package,
      'signType': 'MD5',
      'timeStamp':result.timeStamp+'',
      'paySign': result.sign,
      'success':function(res){
        wx.showToast({
          title: '成功',
          icon: 'success'
        })
        //购买成功之后跳转到首页
        wx.switchTab({
          url: '/pages/home/index',
        })
      },
      'fail':function(res){
        console.log(res)
      }
    })
  },
  goAddressAdd(){
    //添加默认地址，然后跳回来
    wx.navigateTo({
      url: '/pages/addressAdd/index'
    })
  },
  //验证表单(写的有点low)
  validate(options){
    console.log(options)
    let tmessage=''
    let flag=false
    if(!this.data.defaulAddress){
      tmessage='请添加收货地址'
    }else if(this.data.productList.length===0){
      tmessage='请添加商品'
    }else{
      return true
    }
    if(!flag){
      wx.showToast({
        title: tmessage,
        icon: 'none',
        duration: 2000
      })
      return
    }
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