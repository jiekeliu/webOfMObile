module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "./" : "/",
  configureWebpack: {
    resolve: {
      alias: {
        'components': '@/components',
        'currentCommon': 'components/currentCommon',
        'common': 'components/common',
        'assets': '@/assets/extraPage',
        'network': '@/network',
        'views': '@/views',
      }
    }
  },
  devServer: {
    proxy: {
      '':{
        target: 'http://www.liujie006.cn',
        ws:true,
        changeOrigin:true
      },
    }
  },

}
