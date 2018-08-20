let wxRequest=require('../../common/wxRequest.js')
Page({
  //页面的初始数据
  data: {
    userLoaded:false,
    userInfo:null,
    navData:['热门推荐','男性','女性','处方药','医疗器械'],
    navIndex:0
  },
  //生命周期函数--监听页面加载
  onLoad: function (options) {
    //搜索结果
    //搜索结果
    if(options.keywords && options.keywords!==''){
      this.setData({
        keywords:options.keywords
      })
    }else if(options.catalogQuery && options.catalogQuery!==''){
      //点击分类进入页面
      this.setData({
        catalogQuery:options.catalogQuery,
      })
    }
  },
  //生命周期函数--监听页面初次渲染完成
  onReady: function () {},
  //生命周期函数--监听页面显示
  onShow: function () {
    if(this.data.keywords){
      let options={
        keywords:this.data.keywords
      }
      this.get_product_list(this,options)
    }else if(this.data.catalogQuery){
      this.setData({
        navIndex:Number(this.data.catalogQuery)-1
      })
      let options={
        catalogQuery:this.data.catalogQuery
      }
      this.get_product_list(this,options)
    }
  }, 
  get_product_list(that,options){
    wxRequest.hgPostNosession(options,'product/get_product_list','https://seadog.vilicom.cn/shd_web_test/').then(res=>{
      if(res.status===1){
        let productList=res.result.productList
        for(let i=0;i<productList.length;i++){
          productList[i].myRate=Math.floor(productList[i].price)
        }
        that.setData({
          productList:productList
        })
      }else{
        wx.showToast({
          title:res.message,
          duration:3000,
          icon:'none'
        })
      }
    })
  },
  navHandler(e){
    this.setData({
      navIndex:e.currentTarget.dataset.id
    })
    let id=e.currentTarget.dataset.id+1
    let options
    options={
      catalogQuery:id,
      //newCommodity:id===1?1:0
    }
    this.get_product_list(this,options)
  },
  //跳转到商品详情
  toDetail(e){
    wx.navigateTo({
      url: '/pages/gDetail/index?id='+e.currentTarget.dataset.id,
    })
  },
  //生命周期函数--监听页面隐藏
  onHide: function () {},
  //生命周期函数--监听页面卸载
  onUnload: function () {
    this.setData({
      keywords:'',
      catalogQuery:''
    })
  },
  //页面相关事件处理函数--监听用户下拉动作
  onPullDownRefresh: function () {},
  //页面上拉触底事件的处理函数
  onReachBottom: function () {},
  //用户点击右上角分享
  onShareAppMessage: function () {},
})