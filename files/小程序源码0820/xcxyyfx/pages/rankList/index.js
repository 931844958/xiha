var app = getApp();
let wxRequest=require('../../common/wxRequest.js')
Page({
  //页面的初始数据
  data: {
    tabData:['土豪榜','今日榜单'],
    tabIndex:0,
    listName:['排名','昵称','今日收入','平台奖励'],
    listData1:[{"ranking":8,"userId":34,"nickName":"梅香淡雅","headImg":"http://thirdwx.qlogo.cn/mmopen/vi_32/BWHtK6VsOGF8DBQP2ZWQhek1VBbSj7ZQFaLmNjZZiasxvz087K8FibNnLFS5gYmW3ZegBOy3f7Vv9gq4qNhzElcg/132","num":1064.0},{"ranking":9,"userId":null,"nickName":"姚梦兰","headImg":"http://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKKs5cchfZr4bibBF2gwsoqmw7NLKPaibBibNcI5s3BJ3JTUQ13ksbmeVDcejAj7bicOemZYtzcHVntUw/132","num":1063.8},{"ranking":1,"userId":31,"nickName":"我心依旧","headImg":"http://imgtu.5011.net/uploads/content/20170328/5171391490688568.jpg","num":1782.0},{"ranking":6,"userId":58,"nickName":"捂着胸口说胃痛*","headImg":"http://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKufwOp2wDiaWjwtze8YSKnw6PXLibicq9e7gjVNbia0zrccJzHQC7gJeGw35LD3bPMTOfjicJibdNBR3zg/0","num":1245.0},{"ranking":7,"userId":33,"nickName":"hqm","headImg":"https://gss0.baidu.com/9fo3dSag_xI4khGko9WTAnF6hhy/zhidao/wh%3D600%2C800/sign=63c22b67554e9258a6618ee8acb2fd60/c75c10385343fbf2d8f06520b37eca8064388fd1.jpg","num":1127.0},{"ranking":4,"userId":59,"nickName":"美丽心情","headImg":"http://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJDExlPBTcsr7x3jdicUoZXsTLbPghVoGgI93u8VUZGib8bKA0GrerwibFjWrma87ibgxLFxEwVCRweug/0","num":1439.0},{"ranking":5,"userId":35,"nickName":"春天的第一缕阳光","headImg":"http://wx.qlogo.cn/mmopen/vi_32/OiahFcKQiccoVuhdCQ3VlCWfNgN9o8AiafbuAPO7uRBaFCeW403WIFIpmwQQ31ZsxpmQCeP6IGZZ5k5YGKdQVJUkQ/0","num":1324.0},{"ranking":3,"userId":32,"nickName":"上善若水","headImg":"http://wx.qlogo.cn/mmopen/vi_32/hibH1RV2yp4IQfGhD4icdyasNK8XicibffFucUgicfJrjgfjRyoNcN4pe78icMYhxa3RqP45jc1d3IyQLN3ApSQTZBzQ/0","num":1508.0},{"ranking":10,"userId":60,"nickName":"水晶鞋的故事","headImg":"http://wx.qlogo.cn/mmopen/vi_32/LkiaEnjO3ib6LibUmibaqiaEf6t6mzXq2sNDJYVqjHuOrKZVqcRicuh41gXy4UbdhONzTbS693Zgia8knHSNgt2qINmNA/0","num":1011.0}],
    listData2:[{"ranking":7,"userId":61,"nickName":"风雨同舟","headImg":"http://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLeBbqNwgzOTgCLXbKBOfSpM7X4qrErm5HcH4wmkicgwheBFVJic1WJLicYwlkKpFiaXEPlpzFGnibm48A/0","num":436.0},{"ranking":3,"userId":62,"nickName":"Miss云","headImg":"http://wx.qlogo.cn/mmopen/vi_32/nka7kP9261WicicLXt7JB4rkYXia3K2mGj8pONmMzPgP5Edt0OWSSS4dW0N36uq2dCDoz3niaCy0zEvJXfUNWeoZ0A/0","num":688.0},{"ranking":6,"userId":58,"nickName":"捂着胸口说胃痛*","headImg":"http://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKufwOp2wDiaWjwtze8YSKnw6PXLibicq9e7gjVNbia0zrccJzHQC7gJeGw35LD3bPMTOfjicJibdNBR3zg/0","num":477.0},{"ranking":8,"userId":33,"nickName":"hqm","headImg":"https://gss0.baidu.com/9fo3dSag_xI4khGko9WTAnF6hhy/zhidao/wh%3D600%2C800/sign=63c22b67554e9258a6618ee8acb2fd60/c75c10385343fbf2d8f06520b37eca8064388fd1.jpg","num":370.0},{"ranking":4,"userId":59,"nickName":"美丽心情","headImg":"http://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJDExlPBTcsr7x3jdicUoZXsTLbPghVoGgI93u8VUZGib8bKA0GrerwibFjWrma87ibgxLFxEwVCRweug/0","num":538.0},{"ranking":2,"userId":32,"nickName":"上善若水","headImg":"http://wx.qlogo.cn/mmopen/vi_32/hibH1RV2yp4IQfGhD4icdyasNK8XicibffFucUgicfJrjgfjRyoNcN4pe78icMYhxa3RqP45jc1d3IyQLN3ApSQTZBzQ/0","num":740.0},{"ranking":9,"userId":60,"nickName":"水晶鞋的故事","headImg":"http://wx.qlogo.cn/mmopen/vi_32/LkiaEnjO3ib6LibUmibaqiaEf6t6mzXq2sNDJYVqjHuOrKZVqcRicuh41gXy4UbdhONzTbS693Zgia8knHSNgt2qINmNA/0","num":349.0},{"ranking":5,"userId":34,"nickName":"梅香淡雅","headImg":"http://thirdwx.qlogo.cn/mmopen/vi_32/BWHtK6VsOGF8DBQP2ZWQhek1VBbSj7ZQFaLmNjZZiasxvz087K8FibNnLFS5gYmW3ZegBOy3f7Vv9gq4qNhzElcg/132","num":516.0},{"ranking":1,"userId":31,"nickName":"我心依旧","headImg":"http://imgtu.5011.net/uploads/content/20170328/5171391490688568.jpg","num":781.0},{"ranking":10,"userId":35,"nickName":"春天的第一缕阳光","headImg":"http://wx.qlogo.cn/mmopen/vi_32/OiahFcKQiccoVuhdCQ3VlCWfNgN9o8AiafbuAPO7uRBaFCeW403WIFIpmwQQ31ZsxpmQCeP6IGZZ5k5YGKdQVJUkQ/0","num":305.0}]
  },
  //生命周期函数--监听页面加载
  onLoad: function (options) {},
  //生命周期函数--监听页面初次渲染完成
  onReady: function () {},
  //生命周期函数--监听页面显示
  onShow: function () {
    this.getdata(this.data.listData1,this.data.tabIndex)
  },
  changeTab(e){
    let index=e.currentTarget.dataset.index
    if(index===0){
      this.getdata(this.data.listData1,index)
    }else{
      this.getdata(this.data.listData2,index)
    }
  },
  getdata(listData,index){
    for(let i=0;i<listData.length;i++){
      listData[i].ranking=i+1
      if(index===0){
        listData[i].rewarding=2000-(i+1)*27*4
      }else{
        listData[i].rewarding=700-(i+1)*27*2
      }
      
    }
    this.setData({
      listData:listData,
      tabIndex:index
    })
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