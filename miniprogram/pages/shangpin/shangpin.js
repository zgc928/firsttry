Page({
  data: {
    goods: {},
    price: ''
  },
  onLoad(e) {
    console.log('从数据页面获取的值', e)
    var id = e.id
    // 查询单条数据
    wx.cloud.database().collection('goods')
      .doc(id)
      .get()
      .then(res => {
        console.log('商品详情页请求成功', res)
        this.setData({
          goods: res.data
        })
      })
      .catch(res => {
        console.log('商品详情页请求失败', res)
      })
 
  },
  // 获取输入的新价格
  getnewprice(e) {
    console.log(e.detail.value)
    console.log(this.data.price)
    //console.log(this.data.goods.price)
    this.setData({
      price: e.detail.value
    })
    console.log(this.data.price)
    console.log(this.data.goods._id)
  },
  putnewprice() {
    let price = this.data.price
    console.log(price)
    if (price == '') {
      wx.showToast({
        icon: "none",
        title: '新价格还没输入啊',
      })
    } else {
      // 调用云函数
      wx.cloud.callFunction({
        name: 'getdata',
        data: {
          id: this.data.goods._id,
          price:parseInt(price)   
        }
      }).then(res => {
        console.log('云函数调用成功',res)
      }).catch(res => {
        console.log('云函数调用失败',res)
      })
      // 本地调用
      // wx.cloud.database().collection('goods')
      //   .doc(this.data.goods._id)
      //   .update({
      //     data: {
      //       price: price
      //     }
      //   })
      //   .then(res => {
      //     console.log('更新成功', res)
      //   })
      //   .catch(res => {
      //     console.log('更新失败')
      //   })
     this.getnew()
    }

  },
  // 删除
  getdelect() {
    var that = this
    wx.showModal({
      title: '您是否要删除',
      content: '真的要删除吗',
      success(res) {
        if (res.confirm == true) {
          wx.cloud.database().collection('goods')
            .doc(that.data.goods._id)
            .remove()
            .then(res => {
              console.log('删除成功')
            })
            .catch(res => {
              console.log('删除失败')
            })
        } else if (res.confirm == false) {

        }
      }
    })


  },
  getnew(){
    wx.cloud.database().collection('goods')
    .get()
    .then(res => {
      console.log('数据刷新成功')
    })
    .catch(res => {
      console.log('数据刷新失败')
    })
  }

})