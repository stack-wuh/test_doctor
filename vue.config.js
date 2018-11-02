const CompressionWebpackPlugin = require('compression-webpack-plugin')

module.exports = {
  lintOnSave: false,
  outputDir:'./static',
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
  productionSourceMap: false,

  configureWebpack: config => {
    if(process.env.NODE_ENV === 'production'){
      return {
        plugins: [new CompressionWebpackPlugin({
          test: /\.js$|\.html|\.css$/,
          threshold: 10240,
          deleteOriginalAssets: false
        })]
      }
    }
  }
}