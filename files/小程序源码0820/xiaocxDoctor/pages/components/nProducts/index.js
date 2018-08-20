let wxRequest=require('../../../common/wxRequest.js')
var app = getApp();
Component({
  behaviors: [],
  properties: { },
  attached: function(){
    this.getAllProduct(this)
  },
  moved: function(){
  },
  detached: function(){
  },
  data: {
    productList:[]
  },
  methods: {
    getAllProduct(that){
      wxRequest.hgPostNosession({catalogQuery:1},'product/get_product_list','https://seadog.vilicom.cn/shd_web_test/').then(res=>{
        let productList=res.result.productList
        that.setData({
          productList:productList
        })
      })
    },
    //跳转到商品详情
    toDetail(e){
      wx.navigateTo({
        url: '/pages/gDetail/index?id='+e.currentTarget.dataset.id,
      })
    }
  }
})