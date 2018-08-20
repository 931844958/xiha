var app = getApp();
Page({
  //页面的初始数据
  data: {
    questions:[
      {
        cdx:undefined,
        answer:1,
        keyss:'长期大量饮酒对人体哪个脏器损害最严重？',
        valuess:['心脏','肝脏','肾脏','胃']
      },
      {
        cdx:undefined,
        answer:3,
        keyss:'在中医养生学中，先天之本是指',
        valuess:['心','脾','肺','肾']
      },
      {
        cdx:undefined,
        answer:0,
        keyss:'从营养上看，海鲜属于那种食物？',
        valuess:['高蛋白食物','昂贵食物','敬祖先食物','生猛类食物']
      },
      {
        cdx:undefined,
        answer:2,
        keyss:'被称为壮阳草的是哪种蔬菜？',
        valuess:['冈底斯山虫草','祁连山灵芝','高山下的韭菜','并没有壮阳草这种神物']
      },
      {
        cdx:undefined,
        answer:22,
        keyss:'羊肉最适合怎么吃？',
        valuess:['严寒冬日煲羊肉','春暖花开烤羊腿','夏夜啤酒羊肉串','秋风起兮啃羊头']
      },
      {
        cdx:undefined,
        answer:11,
        keyss:'平时怎么坐，前列腺才健康呢？',
        valuess:['少跷二郎腿','时间不宜太久','每隔1小时起来活动5—10分钟']
      },
    ],
    //通过改变current控制轮播图滚动
    sCurrent:0,
    //答对个数
    score:0,
    gameOver:false
  },
  selectItem(e){
    let questions=this.data.questions
    //第几个问题
    let currentItem=e.currentTarget.dataset.fdx
    //选了第几个
    let current=e.currentTarget.dataset.index
    //最后一个问题(总是对的)
    if(currentItem===questions.length-1){
      this.setData({
        score:++this.data.score,
        gameOver:true
      })
    }
    //选了第几个
    questions[currentItem].cdx=current
    //答对了
    if(questions[currentItem].answer===current){
      this.setData({
        score:++this.data.score
      })
    }
    this.setData({
      questions:questions,
      sCurrent:++currentItem
    })
  },
  //生命周期函数--监听页面加载
  onLoad: function (options) {},
  //生命周期函数--监听页面初次渲染完成
  onReady: function () {},
  //生命周期函数--监听页面显示
  onShow: function () {},
  //生命周期函数--监听页面隐藏
  onHide: function () {
    this.setData({
      questions:[
        {
          cdx:undefined,
          answer:1,
          keyss:'长期大量饮酒对人体哪个脏器损害最严重？',
          valuess:['心脏','肝脏','肾脏','胃']
        },
        {
          cdx:undefined,
          answer:3,
          keyss:'在中医养生学中，先天之本是指',
          valuess:['心','脾','肺','肾']
        },
        {
          cdx:undefined,
          answer:0,
          keyss:'从营养上看，海鲜属于那种食物？',
          valuess:['高蛋白食物','昂贵食物','敬祖先食物','生猛类食物']
        },
        {
          cdx:undefined,
          answer:2,
          keyss:'被称为壮阳草的是哪种蔬菜？',
          valuess:['冈底斯山虫草','祁连山灵芝','高山下的韭菜','并没有壮阳草这种神物']
        },
        {
          cdx:undefined,
          answer:22,
          keyss:'羊肉最适合怎么吃？',
          valuess:['严寒冬日煲羊肉','春暖花开烤羊腿','夏夜啤酒羊肉串','秋风起兮啃羊头']
        },
        {
          cdx:undefined,
          answer:11,
          keyss:'平时怎么坐，前列腺才健康呢？',
          valuess:['少跷二郎腿','时间不宜太久','每隔1小时起来活动5—10分钟']
        },
      ],
      //通过改变current控制轮播图滚动
      sCurrent:0,
      //答对个数
      score:0,
      gameOver:false
    })
  },
  //button 组件设置属性 open-type="share" 触发事件
  onShareAppMessage: function (res) {
    return {
      title: '健康有奖竞答',
      success: function(res) {
        console.log('转发成功')
      },
      fail: function(res) {
        console.log('转发失败')
      }
    }
  },
  //生命周期函数--监听页面卸载
  onUnload: function () {},
  //页面相关事件处理函数--监听用户下拉动作
  onPullDownRefresh: function () {},
  //页面上拉触底事件的处理函数
  onReachBottom: function () {},
})