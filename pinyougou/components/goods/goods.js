

// components/goods/goods.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    item:Object
  },

  /**
   * 组件的初始数据
   */
  data: {
    goodsNumber:1,
    totalPrice:0
  },

  /**
   * 组件的方法列表
   */
  attached: function() {
    // 在组件实例进入页面节点树时执行
    this.data.totalPrice=this.data.goodsNumber*this.data.item.goods_price;
    this.triggerEvent("countGoodsNumber",{price:{
      id:this.data.item.goods_id,
      totalPrice:this.data.totalPrice
    }})
  },
  methods: {
    bindCheckboxChange(e){
      console.log(e)
      
      this.triggerEvent("checkChange",{value:e.detail.value,id:+e.currentTarget.id})
    },
    increase(){
      this.data.goodsNumber++;
      let total = this.data.goodsNumber*this.data.item.goods_price;
      this.triggerEvent("countGoodsNumber",{price:{
        id:this.data.item.goods_id,
        totalPrice:total,
        goods_number:goodsNumber
      }})
      this.setData({
        goodsNumber:this.data.goodsNumber
      })
    },
    decrease(){
      this.data.goodsNumber--;
      this.setData({
        goodsNumber:this.data.goodsNumber
      })
      if(this.data.goodsNumber<=0){
        this.setData({
          goodsNumber:0
        })
      }
      let total=this.data.goodsNumber*this.data.item.goods_price;
      this.triggerEvent("countGoodsNumber",{price:{
        id:this.data.item.goods_id,
        totalPrice:total,
        goods_number:goodsNumber
      }})
    }
  }
})
