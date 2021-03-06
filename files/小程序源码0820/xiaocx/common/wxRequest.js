import regeneratorRuntime from  'runtime-module.js' 

let BASE_URL='https://fish.vilicom.cn/fish_web/'
//let BASE_URL='https://seadog.city-game.cn/fish_ds_web/'
const yyPost=async(data,url)=>{
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
      url: BASE_URL+url,
      data: params,
      method: 'POST',
      header:{'content-type': 'application/x-www-form-urlencoded'},
      success: function(res){
        let result=res.data.result
        
        //session失效的情况
        if(result && result.code && (result.code===1005 || result.code===1004 || result.code===3||result.code===2009 || result.code===2003)){
          wx.clearStorageSync()
          wx.redirectTo({
            url: "/pages/login/index"
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
const yyPostNosession=async(params,url)=>{
  wx.showLoading({ 
    title:  '加载中...' , 
  }) 
  let response=await new Promise((resolve,reject)=>{
    wx.request({
      url: BASE_URL+url,
      data: params,
      method: 'POST',
      header:{'content-type': 'application/x-www-form-urlencoded'},
      success: function(res){
        let result=res.data.result
        
        if(result && result.code && (result.code===1005 || result.code===1004 || result.code===3||result.code===2009 || result.code===2003)){
          wx.clearStorageSync()
          wx.redirectTo({
            url: "/pages/login/index"
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
const yyGet=async(data,url)=>{
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
      url: BASE_URL+url,
      data: params,
      method: 'GET',
      success: function(res){
        let result=res.data.result
        //session失效的情况
        if(result && result.code && (result.code===1005 || result.code===1004 || result.code===3||result.code===2009 || result.code===2003)){
          wx.clearStorageSync()
          wx.redirectTo({
            url: "/pages/login/index"
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

const yyGetNosession=async(params,url)=>{
  wx.showLoading({ 
    title:  '加载中...' , 
  }) 
  let response=await new Promise((resolve,reject)=>{
    wx.request({
      url: BASE_URL+url,
      data: params,
      method: 'GET',
      success: function(res){
        let result=res.data.result
        
        //session失效的情况
        if(result && result.code && (result.code===1005 || result.code===1004 || result.code===1003||result.code===2009 || result.code===2003)){
          wx.clearStorageSync()
          wx.redirectTo({
            url: "/pages/login/index"
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
   yyPost,
   yyPostNosession,
   yyGetNosession,
   yyGet
} 