// pages/feedback/feedback.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentId:1,
    questions:["功能建议","购买遇到问题","性能问题","其他"],
    textValue:"",
    tempFilePaths:[]
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
  active(e){
    this.setData({
      currentId:e.currentTarget.dataset.id
    })
  },
  handleInput(e){
    console.log(e)
    this.setData({
      textValue:e.detail.value
    })
  },
  uploadImage(){
    wx.chooseImage({
      success: (res) =>{
        console.log(res)
        const tempFilePaths = res.tempFilePaths
        this.data.tempFilePaths=res.tempFilePaths
      }
    })
  },
  submitForm(){
    if(this.data.tempFilePaths.length!=0){
      wx.showLoading({
        title: '上传中',
        mask:true
      })
      this.data.tempFilePaths.forEach((ele,index)=>{
        wx.uploadFile({
          url: 'https://img.coolcr.cn/api/upload', 
          filePath: ele,
          name: 'image',
          formData: {},
          success (res){
            wx.hideLoading({
              success: (res) => {
                wx.showToast({
                  title: '上传成功',
                  icon:"success",
                  mask:true,
                  duration:2000,
                  success:()=>[
                    wx.navigateBack({
                      delta: 1,
                    })
                  ]
                })
                
              },
            })
            const data =JSON.parse(res.data) 
            console.log(data)
          }
        })
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