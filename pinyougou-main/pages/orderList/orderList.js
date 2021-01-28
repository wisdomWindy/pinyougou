// pages/orderList/orderList.js
import axios from "../../utils/http.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeTab:0
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
    /* 使用token */
    /* axios.get("my/orders/all?type=1&pageIndex=1&pageSize=5").then((res)=>{
      console.log(res)
    }) */
    /* 使用本地数据 */
    let goodsIds=wx.getStorageSync("goodsCart")
    axios.get("goods/goodslist?goods_ids="+goodsIds.join(",")).then(res=>{
      console.log(res)
      this.setData({
        goodsInfos:res.data.message
      })
    })
  },
switchActiveTab(e){
  let current = e.currentTarget.dataset.id;
    this.setData({
      activeTab:current
    })
},
paymoney(){
  axios.post("my/orders/req_unifiedorder",{
    order_number :""
  },"token").then((res)=>{
    console.log(res)
  })
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