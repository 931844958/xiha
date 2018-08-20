App({
  GLOBAL:{
    version:'v1',
    // userId:'',
    // ticket:'',
    // openId:'',
    userData:null,
    userGrade:null,
    schedule:0,
    //等级
    gradeDivide:[],
    baseUrl:'https://fish.vilicom.cn/fish_web/',
    //测试域名
    //baseUrl:'http://a3te69.natappfree.cc/'
  },
  onLaunch: function () {},
  onShow: function (options) {
    //打开小程序获取到的参数
    //console.log(options)
    //wx.getStorageSync如果没有数据返回空
    //如何判断用户是否已经登录，登陆了什么时候失效，如何判断;;如果用户解除授权怎么办
  },
  onHide: function () {},
  onError: function (msg) {}
})
