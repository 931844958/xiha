let wxRequest=require('../../common/wxRequest.js')

Page({
  //页面的初始数据
  data: {
    caseData:[],
    symptomtype:'',
    symptomId:'',
    complete:false,
    //complete:true,
    examResult:''
  },
  //生命周期函数--监听页面加载
  onLoad: function (options) {
    this.setData({
      symptomtype:options.id
    })
    this.getData(this,options.id)
  },
  getResult(options){
    let formdata=options.detail.value
    if(formdata.name.trim()===''){
      wx.showToast({
        title: '请输入姓名',
        icon:'none'
      })
    }else if(/^1[34578]\d{9}$/.test(formdata.phone)){
      this.updateUserNamePhone(this,formdata.name,formdata.phone,this.data.symptomId)
    }else{
      wx.showToast({
        title: '请输入正确的电话号',
        icon:'none'
      })
    }
  },
  updateUserNamePhone(that,realName,phone,symptomId){
    wxRequest.hgPost({
      realName:realName,
      phone:phone,
      symptomId:symptomId
    },'user/account/updateUserNamePhone').then(res=>{
      if(res.status===1){
        that.setData({
          examResult:res.result.userSymptomVo
        })
      }
    })
  },
  //点击完成
  addShdProblem(options){
    let problemData=[]
    let caseData=this.data.caseData
    for(let i=0;i<caseData.length;i++){
      problemData.push({
        id:caseData[i].id,
        status:caseData[i].ssstatus
      })
      // if(caseData[i].ssstatus!==0){
      //   problemData.push({
      //     id:caseData[i].id,
      //     status:caseData[i].ssstatus
      //   })
      // }
    }
    this.postProblem(this,this.data.symptomtype,problemData)
  },
  postProblem(that,symptomtype,problemData){
    wxRequest.hgPost({
      symptomtype:symptomtype,
      symptomids:JSON.stringify(problemData)
    },'problem/addShdProblem').then(res=>{
      if(res.status===1){
        that.setData({
          complete:true, 
          symptomId:res.result.problem.id
        })
      }
    })
  },
  getData(that,id){
    wxRequest.hgGet({id:id},'problem/getSymptomsById').then(res=>{
      if(res.status===1){
        let sympList=res.result.sympList
        for(let i=0;i<sympList.length;i++){
          sympList[i].ssstatus=0
        }
        that.setData({
          caseData:sympList
        })
      }
    })
  },
  //选择
  selectCase(e){
    let current=e.currentTarget.dataset.index
    let caseData=this.data.caseData
    for(let i=0;i<caseData.length;i++){
      if(current===i){
        if(caseData[i].ssstatus===0){
          caseData[i].ssstatus=1
        }else if(caseData[i].ssstatus===1){
          caseData[i].ssstatus=2
        }else if(caseData[i].ssstatus===2){
          caseData[i].ssstatus=0
        }
      }
    }
    this.setData({
      caseData:caseData
    })
  },
  //生命周期函数--监听页面初次渲染完成
  onReady: function () {},
  //生命周期函数--监听页面显示
  onShow: function () {},
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