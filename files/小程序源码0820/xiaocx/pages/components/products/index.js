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
    productList:[],
    maskShow:false,
    sharepindex:0,
    sharepid:0
  },
  methods: {
    getAllProduct(that){
      wxRequest.yyGet({
        userId:wx.getStorageSync('userId')
      },'product/newGetProductList/v1').then(res=>{
        if(res.status===1){
          let productList=res.result.productList
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
    toDetail(){
      this.hideMask()
      wx.navigateTo({
        url: '/pages/gDetail/index?id='+this.data.sharepid,
      })
    },
    //跳转到商品详情
    toDetailBtn(e){
      this.hideMask()
      wx.navigateTo({
        url: '/pages/gDetail/index?id='+(e.currentTarget.dataset.id||this.data.sharepid),
      })
    },
    hideMask(){
      this.setData({
        maskShow:false,
      })
    },
    shareHandler(e){
      this.setData({
        sharepindex:e.currentTarget.dataset.sharepindex,
        sharepid:e.currentTarget.dataset.sharepid,
        maskShow:true
      })
    },
    sharing(e){
      this.hideMask()
      return {
        title: '有鱼健康互助',
        path: `/pages/gDetail/index?id=${this.data.sharepid}&recommendUserId=${wx.getStorageSync('userId')}`,
        success: function(res) {
          console.log('转发成功')
        },
        fail: function(res) {
          console.log('转发失败')
        }
      }
    },
  }
})