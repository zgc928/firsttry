Page({
  // data: {

  // },
  onLoad() {
    wx.cloud.callFunction({
        name: 'getdata'
      }).then(res => {
        console.log('云函数请求成功', res)
      })
      .catch(res => {
        console.log('云函数请求失败', res)
      })
  }
})