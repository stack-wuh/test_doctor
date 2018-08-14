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
      '/api':{
        target:'http:127.0.0.1:8010',
        changeOrigin:true,
      }
    }
  },
}