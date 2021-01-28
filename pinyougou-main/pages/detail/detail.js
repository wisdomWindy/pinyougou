// pages/detail/detail.js
import axios from "../../utils/http.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
goodsId:0,
goodsInfo:[],
region: "",
customItem: '全部',
currentId:1,
starStatus:false,
startUrls:["data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABgUlEQVQ4T6WTvUpDQRCFz2yM14i976BFGhUMSchuUliIhWAvRIJvINgYK30BEfGnsBMLwUbELHMJCGolKj6HYCEpdkc2mHATYog4sNXO+e45M3cJ/ywapo/juOC9HzfG2N/6hgKYuQEg0loX/gxg5i0A+0EoInvGmO1BkIEO4jieF5En7/1uECmldgAsaq0f+iFdADNPAFhOnFettQ4CZmYAWRG5I6KbKIoucrncV7gjZp4SkVMiWgUwBuANQCOVSh0Xi8X30NRsNmecczUAFQCzIuKI6CqTyVTbDqy1OaXUfbBcLpfrwzZjra2HSCKyZIy5TUbYBHAIoK61bmfvr444+aGeITJzAARQiB8nAcxcCuMgorNSqVTt3PUD2k3OuWylUnlJAqy1C0qpx374QEAURZOtVmvae7/+s8YTAB8APkcCiMg1Ea0kHYjIJRGtjQRo75fo3Dl3QEROKVUTkbDGUD3zGRRhLp1OH+Xz+WC3W+F/AbAB4Dk54KGPaZSX/g1d26p3QaBmWgAAAABJRU5ErkJggg==","data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABoklEQVQ4T6XTv2tTURTA8e+570cS7Vpc+p4ukpc6dFFBodCCg0NwENyFSuh/IHRpnOo/IEX8MbiJg+AiYktdBHUSLSbBQX3N5CBCC/W9+O4pL2h4DTFGvOs953PPOZcj/OeRcfmdwJ1HXL8a/9j8U9x4IPQ2FFOK4mT+n4F26F8HbuaJAmvVOF0ZhYysoBN4Z1TkjcKNX8CqNXpu9nPv1TAyAD6doJxYvy5QV6ij+j7a6S3mCe3A21KROYHnRvVpRXsPgy77fXx7mim34t8DLgMusA264SB3TsbphzzoY+jPZmhDkAsKp4AMeOz46VK/gtZx97yoeZmXXIvT5rifaYV+U2BVVS7WdpJngxbagbeMyLpAsxqn/d6HzyC58NChIbbD0jroslq7WOv+fFEEWjPughizhXA/+pIu/b47BAyCLHNRN31XBDoz3lk18noYHwkctemRPbd8DGuv5oibOXeTdP+7W/F3JwKAJ8CloRk8Aq5MCqDwwFq9ZQyZwTQUbeTgXwEc57SUk9tRh91iBV+nmfpWKV1Tm70tDnjsMk2y6QezrLAe5GXH/wAAAABJRU5ErkJggg=="],
starUrl:"",
goodsCart:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   this.data.goodsId= +options.goods_id
   this.data.goodsCart= this.data.goodsCart.concat([140,395])
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
    axios.get("goods/detail?goods_id="+this.data.goodsId).then(res=>{
      console.log(res);
      this.setData({
        goodsInfo:res.data.message,
        starUrl:this.data.startUrls[+this.data.starStatus],
        region:wx.getStorageSync('addr')
      })
    })
    /* axios.get("goods/detail?goods_id=72").then(res=>{
      console.log(res)
    }) */
  },
  active(e){
    this.setData({
      currentId:e.currentTarget.id
    })
  },
switch(){
  wx.switchTab({
    url:"../../pages/cart/cart"
  })
},
bindRegionChange(e){
  this.setData({
    region:e.detail.value
  })
},
chooseAddress(){
  
  wx.chooseAddress({
    success: (result) => {
      console.log(result)
      let addr=result.provinceName+result.cityName+result.countyName+result.detailInfo;
      wx.setStorageSync('addr', addr)
      this.setData({
        region:wx.getStorageSync('addr')
      })
    },
    fail:(err)=>{
      if(!wx.getStorageSync('addr')){
        wx.showModal({
          title:"提示",
          content:"请去我的页面打开授权",
          confirmText:"确定",
          showCancel:false,
          confirmColor:"#999",
          success:(res)=>{
            if(res.confirm){
              wx.switchTab({
                url: '../../pages/mine/mine',
              })
              wx.setStorageSync('data', this.data)
            }
          }
        })
      }
    }
  })
},
call(){
  wx.makePhoneCall({
    phoneNumber:"13487157886",

  })
},
addCart(){
  console.log(this.data.goodsId)
  if(wx.getStorageSync("goodsCart")){
   let goo= wx.getStorageSync("goodsCart")
   goo.push(this.data.goodsId)
   wx.setStorageSync('goodsCart', goo)
  }else{
    this.data.goodsCart.push(this.data.goodsId)
    console.log(this.data.goodsCart)
     wx.setStorageSync('goodsCart',this.data.goodsCart)
  }
   

},
/* 收藏 */
star(){
  this.data.starStatus=!this.data.starStatus;
this.setData({
  starUrl:this.data.startUrls[+this.data.starStatus]
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