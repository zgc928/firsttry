Page({
  getphoto(){
    let that=this
    wx.chooseImage({
      count: 1,
      sizeType:['compressed','original'],
      sourceType:['album','camera'],
      success(res){
    that.uploadimg(res.tempFilePaths[0])
      }
    })
  },
  uploadimg(temp){
wx.cloud.uploadFile(({
  cloudPath:'第一次尝试',
  filePath:temp,
  success(res){
console.log('图片上传成功',res)
  },
  fail(res){
console.log('图片上传失败',res)
  }
}))
  }
})