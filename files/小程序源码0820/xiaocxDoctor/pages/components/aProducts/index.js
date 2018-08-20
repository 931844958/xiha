let wxRequest=require('../../../common/wxRequest.js')
var app = getApp();
Component({
  behaviors: [],
  properties: {
    type:{
      type: Number,
      value: 1
    }
  },
  // 生命周期函数， 可以为函数，或一个在methods段中定义的方法名
  attached: function(){
    this.getAllProduct(this,this.properties.type)
  },
  moved: function(){},
  detached: function(){},
  //页面的初始数据
  data: {
    productList:[],
  },
  methods: {
    getAllProduct(that,type){
      wxRequest.hgPostNosession({},'product/get_product_list','https://seadog.vilicom.cn/shd_web_test/').then(res=>{
        that.setData({
          productList:res.result.productList
        })
      })
    },
    //跳转到商品详情
    toDetail(e){
      wx.navigateTo({
        url:"/pages/gDetail/index?id="+e.currentTarget.dataset.id
      })
    },
  }
})