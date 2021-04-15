Page({
    data: {
      userInfo: {},
      hasUserInfo: false,
      canIUseGetUserProfile: false,
      openid:''
    },
    onLoad() {
      if (wx.getUserProfile) {
        this.setData({
          canIUseGetUserProfile: true
        })
      }
    },
    getUserProfile(e) {
      let that=this
      // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
      // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
      wx.getUserProfile({
        desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
        success: (res) => {
          wx.cloud.callFunction({
            name:'login'
          }).then(res=>{
            console.log('云函数调取成功',res.result.event.userInfo.openId)
that.setData({
  openid:res.result.event.userInfo.openId
})
          }).catch(res=>{
            console.log('云函数调取失败',res)
          })
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
          console.log(this.data.userInfo)
        }
      })
    },
    getUserInfo(e) {
      // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
      this.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: true
      })
    },
    gotohistory(e) {
     
      if(this.data.openid)
      {
        wx.navigateTo({
          url: '/pages/history/history?id=' + e.currentTarget.dataset.id,
        })
        console.log("跳转历史", e.currentTarget.dataset.id)
      }
 else{
   wx.showToast({
     title: '还没登录哦',
     icon:'loading'
   })
 }
    },
  })