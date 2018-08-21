module.exports = {
  lintOnSave: false,
  outputDir:'static',
  baseUrl:'/',
  devServer:{
    open:true,
    host:'0.0.0.0',
    port:'10030',
    https:false,
    proxy:{
      '/car_doctor/':{
        target:'http://192.168.10.122:8080/car_doctor/',
        changeOrigin:true,
        pathRewrite:{
          '^/car_doctor' : ''
        },
      }
    }
  },
}