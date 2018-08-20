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
  // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
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
    //跳转到商品详情
    toDetailsTap(e){
      wx.navigateTo({
        url:"/pages/gDetail/index?id="+e.currentTarget.dataset.id
      })
    },
    getAllProduct(that,type){
      wx.request({
        url: app.GLOBAL.yyHTTP+'order/getAllProduct',
        method: 'GET',
        data:{
          type:type
        },
        success: function(res){
          if(res.data.status===1){
            that.setData({
              productList:res.data.result.productList
              //productList:res.data.result.productList.slice(0,3)
            })
          }
        }
      })
    },
  }
})