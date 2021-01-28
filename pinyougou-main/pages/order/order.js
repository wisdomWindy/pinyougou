const { default: axios } = require("../../utils/http")

// pages/order/order.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userName: "",
    addr: "",
    goods:[],
    order_price:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    if(options){
      this.data.goods= JSON.parse(options.goods)
      this.data.order_price=options.order_price;
      this.data.goods_number=JSON.parse(options.goods_number);
      console.log(this.data.goods)
      console.log(this.data.goods_number)
      this.setData({
        goods:this.data.goods,
        order_price:this.data.order_price
      })
    }
    
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
    if(!this.data.addr){
      wx.showToast({
        title: '请选择地址',
        icon:"none",
        success:(res)=>{
          setTimeout(()=>{
            wx.hideToast({
              success: (res) => {},
            })
          },1500)
          
        }
      })
    }
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
      const route="../../pages/order/order"
      wx.login({
        success:(code)=>{
          let that =this;
          console.log(code)
         console.log(this.data.fromRoute)
         if(this.data.fromRoute){
          wx.navigateTo({
            url: this.data.fromRoute,
          })
         }
         
          const codes=code;
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
                signature:"4848cec1c6130103a6797e2c85b1bcdc4ca4766d"
              }).then((res)=>{
                console.log(res);
                wx.showToast({
                  title:"登陆成功",
                  success:(res)=>{
                    /* 创建订单成功 */
                    axios.post("my/orders/create",{
                      order_price:this.data.order_price,
                      consignee_addr:this.data.addr,
                      goods:this.data.goods
                    },"token").then((res)=>{
                      console.log(res)
                      wx.navigateTo({
                        url:"../../pages/orderList/orderList"
                      })
                    })
                    setTimeout(()=>{
                      wx.hideToast({
                        success:(res)=>{

                        }
                      })
                    },1500)
                  }
                })
                /* 下订单 */
              })
            }
          })
        }
      })
      
    }else{
      let goods=this.data.goods;
    for(var i =0;i<goods.length;i++){
      goods.goods_number=this.data.goods_number[goods.price_id]
    }
    console.log(goods)
      axios.post("my/orders/create",{
        Authorization:wx.getStorageSync('token'),
        order_price:this.data.order_price,
        consignee_addr:this.data.addr,
        goods:goods
      }).then((res)=>{

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