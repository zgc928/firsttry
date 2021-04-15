// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
env: cloud.DYNAMIC_CURRENT_ENV
// 云函数入口函数
// 获取用户的昵称和头像
export async function getUserProfileFunction() {
  return new Promise(async (resolve, reject) => {
    let { nickName = '' } = wx.getStorageSync('airRabbit-userinfo-new') || {};
    let { userInfo } = wx.getStorageSync('airRabbit-userinfo') || {};
    if (userInfo.nickName === '微信用户' && !nickName) {
      console.log('微信用户');
      wx.showModal({
        title: '提示',
        content: '二兔开门小程序请求获取您的昵称和头像信息',
        success: (s) => {
          if (s.confirm) {
            // 当前行为只能是 tap event 触发
            wx.getUserProfile({ 
              desc: '您的信息用户二兔开门小程序', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
              success: (m) => {
                console.info('----getUserProfile----', m);
                wx.setStorageSync('airRabbit-userinfo-new', m.userInfo);
                resolve();
              },
            });
          }
        },
      });
    } else {
      console.log('用户信息自动写入', userInfo);
      if (userInfo.nickName != '微信用户') {
        wx.setStorageSync('airRabbit-userinfo-new', userInfo);
      }
      resolve();
    }
  });
}