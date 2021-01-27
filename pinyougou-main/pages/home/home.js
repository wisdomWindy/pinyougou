// pages/home/home.js
import axios from "../../utils/http.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
swiperData:[],
navigatorData:[],
floorData:[]
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
    /* 获取轮播图图片 */
    axios.get("home/swiperdata").then(res=>{
      
      res.data.message.forEach(function(ele,index){
        ele.navigator_url=ele.navigator_url.replace(/(goods_detail)|(main)/g,"detail")
      })
      console.log(res)
      this.setData({
        swiperData:res.data.message
      })
    })
    /* 获取导航图片 */
    axios.get("home/catitems").then(res=>{
      res.data.message.forEach(function(ele,index){
        if(index===0){
          ele.navigator_url=ele.navigator_url.replace("main","category");
        }
        if(index>0){
          ele.open_type="navigate";
          ele.navigator_url="/pages/goods_list?query="+ele.name.substring(0,2);
        }
      })
      console.log(res)
      this.setData({
        navigatorData:res.data.message
      })
    })
    /* 获取楼层图片 */
    axios.get("home/floordata").then(res=>{
      console.log(res)
      this.setData({
        floorData:res.data.message
      })
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