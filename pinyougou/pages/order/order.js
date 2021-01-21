const { default: axios } = require("../../utils/http")

// pages/order/order.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userName: "",
    addr: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
  chooseAddr() {
    wx.chooseAddress({
      success: (result) => {
        console.log(result)
        this.setData({
          userName: result.userName,
          addr: result.provinceName + result.cityName + result.countyName + result.detailInfo
        })
      },
    })
  },
  toLogin(){
    if(!wx.getStorageSync('token')){
      wx.switchTab({
        url: '../../pages/mine/mine',
      })
    }else{
      axios.post("my/orders/create",{
        Authorization:wx.getStorageSync('token'),
        order_price:"",
        consignee_addr:"",
        goods:[{
          goods_id:"",
          goods_number:"",
          goods_price:""
        }]
      })
    }
    
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})