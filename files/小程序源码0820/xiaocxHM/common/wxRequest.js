import regeneratorRuntime from  'runtime-module.js' 
let BASE_URL='https://seadog.vilicom.cn/web_site/'
const hgPost=async(data,url)=>{
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
const hgGet=async(data,url)=>{
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
        if(result && result.isLogin===0){
          wx.navigateTo({
            url: "/pages/authorize/index"
          })
        }else if(res.data){
          resolve(res.data)
        }else{
          reject(res)
        }
      },
      fail: function() {
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
const hgPostNosession=async(params,url)=>{
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

const hgGetNosession=async(params,url)=>{
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