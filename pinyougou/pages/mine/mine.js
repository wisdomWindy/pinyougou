const { default: axios } = require("../../utils/http");

// pages/mine/mine.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nickName:"",
    profile:"",
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
    if(wx.getStorageSync('nickName')&&wx.getStorageSync('profile')){
      this.setData({
        nickName:wx.getStorageSync('nickName'),
        profile:wx.getStorageSync('profile')
      })
    }
  },
login(){
  console.log(1)
  wx.getSetting({
    success:(res)=> {
      /* console.log(res) */
      if (!res.authSetting['scope.userInfo']) {
       /*  wx.openSetting({
          withSubscriptions: true,
          success:(res)=>{
            console.log(res)
          }
        }) */
        /* wx.authorize({
          scope: 'scope.userInfo',
          fail:(res)=>{
          console.log(res)
          },
          success:(res)=>{
            console.log(res)
          }
        }) */
      }else{
        let codes;
        wx.login({
          success:(code)=>{
            codes=code; 
          }
        })
        wx.getUserInfo({
          success:(res)=>{
            console.log(res);
            wx.setStorageSync('nickName', res.userInfo.nickName);
            wx.setStorageSync('profile', res.userInfo.avatarUrl);
            this.setData({
              nickName:res.userInfo.nickName,
              profile:res.userInfo.avatarUrl
            })
            console.log(codes.code)
            axios.post("users/wxlogin",{
              code:codes.code,
              encryptedData:res.encryptedData,
              iv:res.iv,
              rawData:JSON.stringify(res.rawData),
              signature:res.signature
            }).then((res)=>{
              console.log(res);
              wx.checkSession({
                success: (res) => {
                  console.log(res)
                },
                fail:()=>{
                  this.login();
                }
              })
            })
          }
        })
      }
    }
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