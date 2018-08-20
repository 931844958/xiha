let formatTime=require('../../common/utils.js')
let wxRequest=require('../../common/wxRequest.js')
var app = getApp();
Page({
  //页面的初始数据
  data: {
    navData:['热门','失眠','补肾','祛斑/美白','减肥'],
    navIndex:0,
    hothalls:[],
    knowledges:[],
    hothallsType:0,
    knowledgesType:0,
    //分页默认页
    currentPage:1,
    productList:[],
    state:false
  },
  //生命周期函数--监听页面加载
  onLoad: function (options) {},
  //生命周期函数--监听页面初次渲染完成
  onReady: function () {},
  //生命周期函数--监听页面显示
  onShow: function () {
    
    if(wx.getStorageSync('userId')===''){
      //获取授权用户信息
      wx.navigateTo({
        url: "/pages/authorize/index"
      })
      return;
    }
    this.getKnowList(this,this.data.navIndex===0?5:this.data.navIndex)
    //this.getProductList(this)
  },
  getProductList(that){
    wx.request({
      url: app.GLOBAL.yyHTTP+'order/getAllProduct',
      method: 'GET',
      success: function(res){
        if(res.data.status===1){
          that.setData({
            productList:res.data.result.productList.slice(0,3)
          })
        }
      }
    })
  },
  //获取热门讲堂和知识列表
  getKnowList(that,type){
    //1 失眠 2补肾 3祛斑 4 减肥 5热门
    wxRequest.hgGet({
      articleType:type,
      currentPage:that.data.currentPage,
      pageSize:5
    },'index/index/getKnowList').then(res=>{
      if(res.status===1){ 
        //普通知识列表
        let knowledges=res.result.hothalls[1].knowledges
        let knowledgesType=res.result.hothalls[1].type || ''
        for(let i=0;i<knowledges.length;i++){
          knowledges[i].createTime=formatTime.getDateDiff(knowledges[i].createTime)
        }
        //热门讲堂
        if(that.data.hothalls.length===0){
          let hothalls=res.result.hothalls[0].hothalls
          //热门数据取knowledgesType  普通数据取每条数据的stype
          let hothallsType=res.result.hothalls[0].type
          for(let i=0;i<hothalls.length;i++){
            hothalls[i].createTime=formatTime.getDateDiff(hothalls[i].createTime)
          }
          that.setData({
            currentPage:++that.data.currentPage,
            hothalls:hothalls,
            knowledges:that.data.knowledges.concat(knowledges),
            hothallsType:hothallsType,
            knowledgesType:knowledgesType,
            state:res.result.state===0?false:true
          })
        }else{
          that.setData({
            currentPage:++that.data.currentPage,
            knowledges:that.data.knowledges.concat(knowledges),
            knowledgesType:knowledgesType,
            state:res.result.state===0?false:true
          })
        }
      }
    })
  },
  //点击tab事件 点击导航栏,要初始化数据
  navHandler(e){
    this.setData({
      currentPage:1,
      knowledges:[],
      navIndex:e.target.dataset.id
    }) 
    this.getKnowList(this,this.data.navIndex===0?5:this.data.navIndex)
  },
  toProducts(){
    wx.switchTab({
      url: "/pages/products/index"
    })
  },
  toSearch(){
    wx.navigateTo({
      //搜索页面（天才想法）
      //url: '/pages/search/index',
      url: '/pages/doctors/index',
    })
  },
  //生命周期函数--监听页面隐藏
  onHide: function () {},
  //生命周期函数--监听页面卸载
  onUnload: function () {},
  //页面相关事件处理函数--监听用户下拉动作
  onPullDownRefresh: function () {},
  //页面上拉触底事件的处理函数
  onReachBottom: function () {
    if(this.data.currentPage===1){
      this.setData({
        currentPage:2
      })
    }
    this.getKnowList(this,this.data.navIndex===0?5:this.data.navIndex)
  },
  //用户点击右上角分享
  onShareAppMessage: function () {},
})