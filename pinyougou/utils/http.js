const axios={
  BASE_URL:"https://api-hmugo-web.itheima.net/api/public/v1/",
  get(url,token){
    return new Promise((resolve,reject)=>{
      let header={};
      if(token){
        header={
          "Authorization":token
        }
      }
      wx.request({
        url:axios.BASE_URL+url,
        header,
        success:(res)=>{
          resolve(res);
        },
        fail:(err)=>{
          reject(err)
        }
      })
    });
  },
  post(url,params,token){
    return new Promise((resolve,reject)=>{
      let header={};
      if(token){
        header={
          "content-type":"application/x-www-form-urlencoded",
          "Authorization":token
        }
      }else{
        header={
          "content-type":"application/x-www-form-urlencoded",
        }
      }
      wx.request({
        url:axios.BASE_URL+url,
        data:params,
        method:"POST",
        header,
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