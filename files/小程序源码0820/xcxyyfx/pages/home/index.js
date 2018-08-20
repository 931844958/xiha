let wxRequest=require('../../common/wxRequest.js')
let utils=require('../../common/utils.js')
Page({
  //页面的初始数据
  data: {
    //用户信息是否被加载
    userLoaded:false,
    userInfo:null,
    extractData:[{"extractMoney":"200","extractTime":1531393513165,"headPrtrait":"http://imgtu.5011.net/uploads/content/20170328/5171391490688568.jpg","nickname":"我心依旧","userId":31},{"extractMoney":"200","extractTime":1531493513165,"headPrtrait":"http://wx.qlogo.cn/mmopen/vi_32/hibH1RV2yp4IQfGhD4icdyasNK8XicibffFucUgicfJrjgfjRyoNcN4pe78icMYhxa3RqP45jc1d3IyQLN3ApSQTZBzQ/0","nickname":"上善若水","userId":32},{"extractMoney":"200","extractTime":1531093513165,"headPrtrait":"https://gss0.baidu.com/9fo3dSag_xI4khGko9WTAnF6hhy/zhidao/wh%3D600%2C800/sign=63c22b67554e9258a6618ee8acb2fd60/c75c10385343fbf2d8f06520b37eca8064388fd1.jpg","nickname":"hqm","userId":33},{"extractMoney":"200","extractTime":1531593513165,"headPrtrait":"http://thirdwx.qlogo.cn/mmopen/vi_32/BWHtK6VsOGF8DBQP2ZWQhek1VBbSj7ZQFaLmNjZZiasxvz087K8FibNnLFS5gYmW3ZegBOy3f7Vv9gq4qNhzElcg/132","nickname":"梅香淡雅","userId":34},{"extractMoney":"200","extractTime":1531593513165,"headPrtrait":"http://wx.qlogo.cn/mmopen/vi_32/OiahFcKQiccoVuhdCQ3VlCWfNgN9o8AiafbuAPO7uRBaFCeW403WIFIpmwQQ31ZsxpmQCeP6IGZZ5k5YGKdQVJUkQ/0","nickname":"春天的第一缕阳光","userId":35},{"extractMoney":"130","extractTime":1531493513165,"headPrtrait":"http://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKufwOp2wDiaWjwtze8YSKnw6PXLibicq9e7gjVNbia0zrccJzHQC7gJeGw35LD3bPMTOfjicJibdNBR3zg/0","nickname":"捂着胸口说胃痛*","userId":58},{"extractMoney":"140","extractTime":1531293513165,"headPrtrait":"http://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJDExlPBTcsr7x3jdicUoZXsTLbPghVoGgI93u8VUZGib8bKA0GrerwibFjWrma87ibgxLFxEwVCRweug/0","nickname":"美丽心情","userId":59},{"extractMoney":"200","extractTime":1531693513165,"headPrtrait":"http://wx.qlogo.cn/mmopen/vi_32/LkiaEnjO3ib6LibUmibaqiaEf6t6mzXq2sNDJYVqjHuOrKZVqcRicuh41gXy4UbdhONzTbS693Zgia8knHSNgt2qINmNA/0","nickname":"水晶鞋的故事","userId":60},{"extractMoney":"200","extractTime":1531293513165,"headPrtrait":"http://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLeBbqNwgzOTgCLXbKBOfSpM7X4qrErm5HcH4wmkicgwheBFVJic1WJLicYwlkKpFiaXEPlpzFGnibm48A/0","nickname":"风雨同舟","userId":61},{"extractMoney":"200","extractTime":1531793513165,"headPrtrait":"http://wx.qlogo.cn/mmopen/vi_32/nka7kP9261WicicLXt7JB4rkYXia3K2mGj8pONmMzPgP5Edt0OWSSS4dW0N36uq2dCDoz3niaCy0zEvJXfUNWeoZ0A/0","nickname":"Miss云","userId":62},{"extractMoney":"200","extractTime":1531393513165,"headPrtrait":"http://wx.qlogo.cn/mmopen/vi_32/FcmBN8lCeJF9ZJFwSNF6mKrwvtR5PNhjjMKHicGibvaicFNn9mXou4libevEOEfNuutEJl5AicHvQscWFlnJJVjgp2g/0","nickname":"婉若清风=萌系姑娘","userId":63},{"extractMoney":"100","extractTime":1531293513165,"headPrtrait":"http://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJlXMqDz35qFviciblltyAicXibKwmadV9icGcplLRxDXHUKHVOmVWbZABS0MvI1owY9WVYibt8rR9UicMUQ/0","nickname":"婷婷@sugin","userId":64},{"extractMoney":"110","extractTime":1531193513165,"headPrtrait":"http://imgtu.5011.net/uploads/content/20170328/5171391490688568.jpg","nickname":"我心依旧","userId":31},{"extractMoney":"200","extractTime":1531493513165,"headPrtrait":"http://wx.qlogo.cn/mmopen/vi_32/hibH1RV2yp4IQfGhD4icdyasNK8XicibffFucUgicfJrjgfjRyoNcN4pe78icMYhxa3RqP45jc1d3IyQLN3ApSQTZBzQ/0","nickname":"上善若水","userId":32},{"extractMoney":"200","extractTime":1531493513165,"headPrtrait":"https://gss0.baidu.com/9fo3dSag_xI4khGko9WTAnF6hhy/zhidao/wh%3D600%2C800/sign=63c22b67554e9258a6618ee8acb2fd60/c75c10385343fbf2d8f06520b37eca8064388fd1.jpg","nickname":"hqm","userId":33},{"extractMoney":"200","extractTime":1531693513165,"headPrtrait":"http://thirdwx.qlogo.cn/mmopen/vi_32/BWHtK6VsOGF8DBQP2ZWQhek1VBbSj7ZQFaLmNjZZiasxvz087K8FibNnLFS5gYmW3ZegBOy3f7Vv9gq4qNhzElcg/132","nickname":"梅香淡雅","userId":34},{"extractMoney":"200","extractTime":1531393513165,"headPrtrait":"http://wx.qlogo.cn/mmopen/vi_32/OiahFcKQiccoVuhdCQ3VlCWfNgN9o8AiafbuAPO7uRBaFCeW403WIFIpmwQQ31ZsxpmQCeP6IGZZ5k5YGKdQVJUkQ/0","nickname":"春天的第一缕阳光","userId":35},{"extractMoney":"130","extractTime":1531393513165,"headPrtrait":"http://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKufwOp2wDiaWjwtze8YSKnw6PXLibicq9e7gjVNbia0zrccJzHQC7gJeGw35LD3bPMTOfjicJibdNBR3zg/0","nickname":"捂着胸口说胃痛*","userId":58},{"extractMoney":"140","extractTime":1531493513165,"headPrtrait":"http://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJDExlPBTcsr7x3jdicUoZXsTLbPghVoGgI93u8VUZGib8bKA0GrerwibFjWrma87ibgxLFxEwVCRweug/0","nickname":"美丽心情","userId":59},{"extractMoney":"200","extractTime":1531593513165,"headPrtrait":"http://wx.qlogo.cn/mmopen/vi_32/LkiaEnjO3ib6LibUmibaqiaEf6t6mzXq2sNDJYVqjHuOrKZVqcRicuh41gXy4UbdhONzTbS693Zgia8knHSNgt2qINmNA/0","nickname":"水晶鞋的故事","userId":60},{"extractMoney":"200","extractTime":1531793513165,"headPrtrait":"http://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLeBbqNwgzOTgCLXbKBOfSpM7X4qrErm5HcH4wmkicgwheBFVJic1WJLicYwlkKpFiaXEPlpzFGnibm48A/0","nickname":"风雨同舟","userId":61},{"extractMoney":"200","extractTime":1531793513165,"headPrtrait":"http://wx.qlogo.cn/mmopen/vi_32/nka7kP9261WicicLXt7JB4rkYXia3K2mGj8pONmMzPgP5Edt0OWSSS4dW0N36uq2dCDoz3niaCy0zEvJXfUNWeoZ0A/0","nickname":"Miss云","userId":62},{"extractMoney":"200","extractTime":1531493513165,"headPrtrait":"http://wx.qlogo.cn/mmopen/vi_32/FcmBN8lCeJF9ZJFwSNF6mKrwvtR5PNhjjMKHicGibvaicFNn9mXou4libevEOEfNuutEJl5AicHvQscWFlnJJVjgp2g/0","nickname":"婉若清风=萌系姑娘","userId":63},{"extractMoney":"100","extractTime":1531293513165,"headPrtrait":"http://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJlXMqDz35qFviciblltyAicXibKwmadV9icGcplLRxDXHUKHVOmVWbZABS0MvI1owY9WVYibt8rR9UicMUQ/0","nickname":"婷婷@sugin","userId":64},{"extractMoney":"110","extractTime":1531593513165,"headPrtrait":"http://img1.touxiang.cn/uploads/20121111/11-012810_655.jpg","nickname":"珊珊","userId":65},{"extractMoney":"140","extractTime":1531593513165,"headPrtrait":"http://scimg.jb51.net/allimg/160728/103-160HQAU3563.jpg","nickname":"英歌山","userId":68},{"extractMoney":"150","extractTime":1531593513165,"headPrtrait":"http://img1.touxiang.cn/uploads/20121111/11-012810_655.jpg","nickname":"珊珊","userId":65},{"extractMoney":"140","extractTime":1531393513165,"headPrtrait":"http://scimg.jb51.net/allimg/160728/103-160HQAU3563.jpg","nickname":"英歌山","userId":68},{"extractMoney":"150","extractTime":1531593513165,"headPrtrait":"http://img1.touxiang.cn/uploads/20121111/11-012810_655.jpg","nickname":"露水姑娘","userId":69}],
    navData:[],
    navIndex:0,
    articleType:0,
    knowledges:[],
    knowledgesType:0,
    //分页默认页
    currentPage:1,
    //搜索关键字
    keywords:''
  },
  //生命周期函数--监听页面加载
  onLoad: function (options) {},
  //生命周期函数--监听页面初次渲染完成
  onReady: function () {},
  //生命周期函数--监听页面显示
  onShow: function () {
    //是否已经授权
    // if(wx.getStorageSync('isBoundWeChat')===0){
    //   //获取授权用户信息
    //   wx.redirectTo({
    //     url: "/pages/login/index"
    //   })
    //   return;
    // }
    let extractData=this.data.extractData
    for(let i=0;i<extractData.length;i++){
      extractData[i].extractTimeFormat=utils.getDateDiff(extractData[i].extractTime)
      if(i%2===0){
        extractData[i].extractFrom='六味地黄膏'
      }else if(i%3===0){
        extractData[i].extractFrom='龟鹿二仙膏'
      }else if(i%4===0){
        extractData[i].extractFrom='蛮龙液'
      }else{
        extractData[i].extractFrom="参茸蛤蚧保肾丸"
      }
    }
    this.setData({
      extractData:extractData
    })

    //获取用户信息
    let userType=wx.getStorageSync('userType')
    if(userType===1){
      this.pharmacyResultVo(this,'pharmacy/get_info')
    }else if(userType===3){
      this.pharmacyResultVo(this,'channel/get_info')
    }
    this.setData({
      userType:wx.getStorageSync("userType")===1?'药店':'代理',
      userTypeImg:wx.getStorageSync("userType"),
    })
    //this.sales_record(this)
  },
  pharmacyResultVo(that,path){
    wxRequest.hgGet({},path,'https://fish.vilicom.cn/fish_ds_web_test/').then(res=>{
      this.setData({
        pharmacyResultVo:res.result.pharmacyResultVo
      })
      wx.setStorageSync('pharmacyResultVo', res.result.pharmacyResultVo)
    })
  },
  //销售记录
  sales_record(that){
    wxRequest.hgPost({},'pharmacy/sales_record','https://fish.vilicom.cn/fish_ds_web_test/').then(res=>{
      if(res.status===1){
        let salesRecord=res.result.salesRecord
        for(let i=0;i<salesRecord.length;i++){
          salesRecord[i].createTime=utils.getDateDiff(salesRecord[i].createTime)
        }
        that.setData({
          salesRecord:salesRecord
        })
      }
    })
  },
  //获取商品分类
  get_product_catalog(){
    wxRequest.hgGetNosession({},'product/get_product_catalog','https://seadog.vilicom.cn/shd_web_test/').then(res=>{})
  },
  //获取keywords
  searchInput(e){
    this.setData({
      keywords:e.detail.value
    })
  },
  toProduct(e){
    if(this.data.keywords && this.data.keywords.trim()){
      let KEYWORDS=this.data.keywords
      this.setData({
        keywords:''
      })
      wx.navigateTo({
        url: `/pages/products/index?keywords=${KEYWORDS}`
      })
    }else{
      let id=e.currentTarget.dataset.id
      wx.navigateTo({
        url: `/pages/products/index?catalogQuery=${id}`
      })
    }
  },
  toH5(e){
    wx.navigateTo({
      url: '/pages/h5/index?src='+e.currentTarget.dataset.src
    })
  },
  //生命周期函数--监听页面隐藏
  onHide: function () {
    this.setData({
      userLoaded:false
    })
  },
  //生命周期函数--监听页面卸载
  onUnload: function () {},
  //页面相关事件处理函数--监听用户下拉动作
  onPullDownRefresh: function () {},
  //页面上拉触底事件的处理函数
  onReachBottom: function () {
    // if(this.data.currentPage===1){
    //   this.setData({
    //     currentPage:2
    //   })
    // }
    // this.getKnowList(this,this.data.articleType)
  },
  //用户点击右上角分享
  onShareAppMessage: function () {},
})