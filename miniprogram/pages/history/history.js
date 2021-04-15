Page({
  data:{
    list:[],
    id:'',
    name: '',
    price: '',
    img: '',
  },
  onLoad(e) {
    console.log('历史界面中的e', e.id)
    this.setData({
      id:e.id
    })
   this.getnew()
  },
  // 数据刷新
  getnew() {
    wx.cloud.database().collection('goods')
      .get()
      .then(res => {
        console.log('数据刷新成功')
        this.setData({
          list: res.data
        })
      })
      .catch(err => {

      })
  },
 // 跳转到商品详情页
 godetail(e) {
  console.log("跳转详情", e.currentTarget.dataset.id)
  wx.navigateTo({
    url: '/pages/shangpin/shangpin?id=' + e.currentTarget.dataset.id,
  })
},

// 商品名获取
getname(e) {
  console.log(e.detail.value)
  this.setData({
    name: e.detail.value
  })
},

// 商品价格获取
getprice(e) {
  this.setData({
    price: e.detail.value
  })
},

// 添加商品
addgood() {
  // // 关联数据
  let name = this.data.name
  let price = this.data.price
  let img = this.data.img

  // 判断输入是否为空
  if (name == '') {
    wx.showToast({
      icon: 'none',
      title: '商品名没输入'
    })
  } else if (price == '') {
    wx.showToast({
      icon: 'none',
      title: '商品价格没输入'
    })
  }
  // 不为空则进行添加
   else {
    console.log('可以添加了', name, price)
    // 执行添加照片函数并获取照片在云储存中的链接
    this.getphoto()
    console.log('在add函数中',this.data.flag)
// if(this.data.flag){
//   this.adddata()
// }
 
    // console.log('上传时的图片参数',img)
    // console.log('直接获取',this.data.img)
    // 在云数据库库中新建一条
  
  }
},

// 刷新函数
getnew() {
  wx.cloud.database().collection('goods')
    .get()
    .then(res => {
      console.log('数据刷新成功')
      this.setData({
        list: res.data
      })
    })
    .catch(err => {

    })
},

// 按照商品价格排序
getup() {
  wx.cloud.database().collection('goods')
    .orderBy("price", 'asc')
    .get()
    .then(res => {
      this.setData({
        list: res.data
      })
    })
    .catch(err => {

    })
  this.getnew()
},

// 获取图片并上传
getphoto() {
  let that = this
  // 获取图片
  wx.chooseImage({
    count: 1,
    sizeType: ['compressed', 'original'],
    sourceType: ['album', 'camera'],
    success(res) {
      // 上传图片
      wx.cloud.uploadFile(({
        cloudPath: '第三次尝试',
        filePath: res.tempFilePaths[0],
        success(res) {
          // console.log('图片上传成功', res)
          console.log('图片上传成功',res.fileID),
          that.setData({
            img: res.fileID,
            flag:1
          })
          console.log(that.data.img)
          console.log(that.data.flag)
          that.adddata()
           // 在云数据库库中新建一条
    // wx.cloud.database().collection('goods')
    //   .add({
    //     data: {
    //       name:this.data.name,
    //       price: this.data.price,
    //       img: this.data.img
    //     }
    //   })
    //   .then(res => {
    //     console.log('添加成功')
    //     this.getnew()
    //   })
    //   .catch(res => {
    //     console.log('添加失败')
    //   })
          that.getnew()
        },
        fail(res) {
          console.log('图片上传失败', res)
        }
      }))
    }
  })
},
// 添加数据（在addgood中调用）
adddata(){
let name = this.data.name
let price = this.data.price
let img = this.data.img
wx.cloud.database().collection('goods')
.add({
  data: {
    name: name,
    price: price,
    img: img
  }
})
.then(res => {
  console.log('添加成功')
  this.getnew()
})
.catch(res => {
  console.log('添加失败')
})
}
// 添加新函数
})