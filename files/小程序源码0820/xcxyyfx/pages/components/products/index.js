let wxRequest=require('../../../common/wxRequest.js')
var app = getApp();
Component({
  behaviors: [],
  properties: {},
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
      wxRequest.hgPostNosession({userType:wx.getStorageSync('userType')},'product/get_product_list','https://seadog.vilicom.cn/shd_web_test/').then(res=>{
        if(res.status===1){
          let productList=res.result.productList
          for(let i=0;i<productList.length;i++){
            //下级的 
            productList[i].myRate=Math.floor(productList[i].price*productList[i].angelCommission/100)
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
    //跳转到商品详情
    toDetail(e){
      wx.navigateTo({
        url: '/pages/gDetail/index?id='+e.currentTarget.dataset.id,
      })
    },
  }
})