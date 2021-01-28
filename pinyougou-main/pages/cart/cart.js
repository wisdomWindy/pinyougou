// pages/cart/cart.js
import axios from "../../utils/http";
Page({

  /**
   * 页面的初始数据
   */
  data: {

goodsList:[],
checks:[],
allChecked:true,
totalPriceList:{},
totalPrice:0,
goodsNumber:0,
numberList:{},
order_price:0
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
bindCheckboxChange(e){
  
  if(e.detail.value.length>0){
   this.data.checks= this.data.checks.concat(e.detail.value);
   console.log(this.data.checks)
  }else{
    this.data.checks.splice(this.data.checks.indexOf(e.detail.id),1)
  }

  if(this.data.checks.length<this.data.goodsList.length){
    this.setData({
      allChecked:false
    })
  }else{
    this.setData({
      allChecked:true
    })
  }
  console.log(this.data.checks)
  console.log(this.data.totalPriceList)
  let keys=Object.keys(this.data.totalPriceList);
  for(var i=0;i<keys.length;i++){
    keys[i]=Number(keys[i])
    if(keys[i] == this.data.checks[i]){
      this.data.totalPrice+=this.data.totalPriceList[keys[i]]
    }
    
  }
    this.setData({
      totalPrice:this.data.totalPrice
    },()=>{
      this.data.totalPrice=0;
    })
},
countTotalPrice(e){
  console.log(e)

 this.data.numberList[e.detail.price.id]=e.detail.price.goods_number;
 console.log(this.data.numberList)
 this.data.goodsNumber=0;
 for(var key in this.data.numberList){
   this.data.goodsNumber+= this.data.numberList[key]
 }

this.data.totalPriceList[e.detail.price.id]=e.detail.price.totalPrice;
console.log(this.data.goods)
this.setData({
  goodsNumber:this.data.goodsNumber
},()=>{
  
  this.data.goodsNumber=0
})

/*  console.log(e.detail.price) */
console.log(this.data.totalPriceList)
console.log(this.data.checks)
console.log(this.data.totalPrice)
for(var i=0;i<this.data.checks.length;i++){
  if(this.data.totalPriceList[this.data.checks[i]]){
    this.data.totalPrice+=this.data.totalPriceList[this.data.checks[i]]
  }
}

console.log(this.data.totalPrice)
/* this.data.order_price=this.data.totalPrice; */
  this.setData({
    totalPrice:this.data.totalPrice
  },()=>{
    this.data.totalPrice=0;
  })
},
orderPay(){
  console.log(this.data.goodsList)
  const goods=this.data.goodsList;
  console.log(this.data.order_price)
  wx.navigateTo({
    url:"../../pages/order/order?order_price="+this.data.order_price+"&goods="+JSON.stringify(goods)+"&goods_number="+JSON.stringify(this.data.numberList)
  })
},
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log(wx.getStorageSync("goodsCart"))
    /* this.data.goodsList=this.data.goodsIds.concat(wx.getStorageSync("goodsCart"))
    this.setData({
      goodsList:this.data.goodsList
    }) */
    console.log(this.data.goodsList)
    let idString=wx.getStorageSync("goodsCart").join(",")
    axios.get("goods/goodslist?goods_ids="+idString).then(res=>{
      console.log(res)
      res.data.message.forEach((ele,index)=>{
        this.data.checks.push(ele.goods_id)
      })
      this.setData({
        checks:this.data.checks
      },()=>{
        this.data.checks=[]
      })
      this.setData({
        goodsList:res.data.message
      },()=>{
        if(this.data.allChecked){
          let total=0
          console.log(1)
          this.data.goodsList.forEach((ele,index)=>{
            total+=ele.goods_price;
            this.setData({
              totalPrice:total
            })
          })
          this.data.order_price=this.data.totalPrice;
        }
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