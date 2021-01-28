// pages/goodsList/goodsList.js
import axios from "../../utils/http"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentId:1,
    tabs:[
      {
        id:1,
        name:"综合",
        isActive:true
      },{
        id:2,
        name:"销量",
        isActive:false
      },{
        id:3,
        name:"价格",
        isActive:false
      }
    ],
    queryParams:{
      query:'',
      cid:'',
      pagenum:1,
      pagesize:10
    },
    goods:[],
    totalPages:1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options.cid){
      this.data.queryParams.cid=options.cid
      this.getGoodsList(this.data.queryParams)
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
    this.getGoodsList(this.data.queryParams);
  },
activeTab(e){
  console.log(e)
  let index=e.currentTarget.dataset.index
  let tabs=this.data.tabs
  tabs.forEach((ele,i)=>{
    ele.isActive = index == i ? true : false
    
  })
 this.setData({
   tabs,
   currentId:this.data.tabs[index].id
 })
},
getGoodsList(queryParams){
  axios.get("goods/search?query="+queryParams.query+"&cid="+queryParams.cid+"&pagenum="+queryParams.pagenum+"&pagesize="+queryParams.pagesize).then(res=>{
    console.log(res)
    let goods=res.data.message.goods
   goods= this.data.goods.concat(goods)
   let totalPages=Math.ceil(parseInt(res.data.message.total/this.data.queryParams.pagesize))
   console.log(totalPages)
    this.setData({
      goods,
      totalPages
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
  onscrollLower(){
    console.log(this.data.queryParams.pagenum)
    if(this.data.queryParams.pagenum<this.data.totalPages){
      
      this.data.queryParams.pagenum+=1
    }else{
      this.data.queryParams.pagenum=this.data.totalPages
    }
    console.log(this.data.queryParams)
    wx.showLoading({
      title: '加载中',
      success:()=>{
        this.getGoodsList(this.data.queryParams)
        wx.hideLoading({
          success: (res) => {},
        })
      }
    })
  },
  onReachBottom: function () {
   
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})