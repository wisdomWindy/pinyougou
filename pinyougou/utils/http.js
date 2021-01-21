const axios={
  BASE_URL:"https://api-hmugo-web.itheima.net/api/public/v1/",
  get(url){
    return new Promise((resolve,reject)=>{
      wx.request({
        url:axios.BASE_URL+url,
        success:(res)=>{
          resolve(res);
        },
        fail:(err)=>{
          reject(err)
        }
      })
    });
  },
  post(url,params){
    return new Promise((resolve,reject)=>{
      wx.request({
        url:axios.BASE_URL+url,
        data:params,
        method:"POST",
        header:{"content-type":"application/x-www-form-urlencoded"},
        success:(res)=>{
          resolve(res);
        },
        fail:(err)=>{
          reject(err)
        }
      })
    })
  }
}
export default axios;