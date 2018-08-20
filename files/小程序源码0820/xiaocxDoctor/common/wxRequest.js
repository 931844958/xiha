import regeneratorRuntime from  'runtime-module.js' 

let BASE_URL='https://seadog.vilicom.cn/shd_web_test/'
const hgPost=async(data,url,base_url,header)=>{
  wx.showLoading({ 
    title:  '加载中...' , 
  }) 
  let params
  if(header&&header==='application/json'){
    params=Object.assign(data, {
      session:{
        userId:wx.getStorageSync('userId'),
        ticket:wx.getStorageSync('ticket')
      }
    }) 
  }else{
    params=Object.assign(data, {
      session:JSON.stringify({
        userId:wx.getStorageSync('userId'),
        ticket:wx.getStorageSync('ticket')
      })
    }) 
  }
  
  let response=await new Promise((resolve,reject)=>{
    wx.request({
      url: (base_url || BASE_URL)+url,
      data: params,
      method: 'POST',
      header:{'content-type': (header || 'application/x-www-form-urlencoded')},
      success: function(res){
        let result=res.data.result
        //session失效的情况
        if(result && result.isLogin===0){
          wx.navigateTo({
            url: "/pages/authorize/index"
          })
        }else if(res.data){
          resolve(res.data)
        }else{
          console.log(res)
          reject(res)
        }
      },
      fail: function(err) {
        console.log(err)
        wx.showToast({
          title:  '网络出错，请重试'
        })
      },
      complete: function() {
        wx.hideLoading()
      }
    })
  })
  return response
}
const hgPostNosession=async(params,url,base_url)=>{
  wx.showLoading({ 
    title:  '加载中...' , 
  }) 
  console.log(params)
  let response=await new Promise((resolve,reject)=>{
    wx.request({
      url: (base_url || BASE_URL)+url,
      data: params,
      method: 'POST',
      header:{'content-type': 'application/x-www-form-urlencoded'},
      success: function(res){
        let result=res.data.result
        //session失效的情况
        if(result && result.isLogin===0){
          wx.navigateTo({
            url: "/pages/authorize/index"
          })
        }else if(res.data){
          resolve(res.data)
        }else{
          console.log(res)
          reject(res)
        }
      },
      fail: function(err) {
        console.log(err)
        wx.showToast({
          title:  '网络出错，请重试'
        })
      },
      complete: function() {
        wx.hideLoading()
      }
    })
  })
  return response
}
const hgGet=async(data,url,base_url)=>{
  wx.showLoading({ 
    title:  '加载中...' , 
  }) 
  let params=Object.assign(data, {
    session:JSON.stringify({
      userId:wx.getStorageSync('userId'),
      ticket:wx.getStorageSync('ticket')
    })
  }) 
  let response=await new Promise((resolve,reject)=>{
    wx.request({
      url: (base_url || BASE_URL)+url,
      data: params,
      method: 'GET',
      success: function(res){
        let result=res.data.result
        //session失效的情况
        if(result && result.isLogin===0){
          wx.navigateTo({
            url: "/pages/authorize/index"
          })
        }else if(res.data){
          resolve(res.data)
        }else{
          console.log(res)
          reject(res)
        }
      },
      fail: function(err) {
        console.log(err)
        wx.showToast({
          title:  '网络出错，请重试'
        })
      },
      complete: function(res) {
        wx.hideLoading()
      }
    })
  })
  return response
}

const hgGetNosession=async(params,url,base_url)=>{
  wx.showLoading({ 
    title:  '加载中...' , 
  }) 
  let response=await new Promise((resolve,reject)=>{
    wx.request({
      url: (base_url || BASE_URL)+url,
      data: params,
      method: 'GET',
      success: function(res){
        let result=res.data.result
        //session失效的情况
        if(result && result.isLogin===0){
          wx.navigateTo({
            url: "/pages/authorize/index"
          })
        }else if(res.data){
          resolve(res.data)
        }else{
          console.log(res)
          reject(res)
        }
      },
      fail: function(err) {
        console.log(err)
        wx.showToast({
          title:  '网络出错，请重试'
        })
      },
      complete: function(res) {
        wx.hideLoading()
      }
    })
  })
  return response
}
module.exports = { 
   hgPost:hgPost,
   hgPostNosession:hgPostNosession,
   hgGetNosession:hgGetNosession,
   hgGet:hgGet 
} 