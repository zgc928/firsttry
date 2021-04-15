// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
// 配置当前运行环境
env: cloud.DYNAMIC_CURRENT_ENV
// 云函数入口函数
exports.main = async (event, context) => {
  return cloud.database().collection('goods')
  .doc(event.id)
  .update({
    data:{price:event.price}
  })
   
}