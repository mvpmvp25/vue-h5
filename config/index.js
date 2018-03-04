// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')

module.exports = {
    build: {
        env: {
            NODE_ENV: '"production"'
        },
        index: path.resolve(__dirname, '../dist/index.html'),// 构建输出的index.html文件
        assetsRoot: path.resolve(__dirname, '../dist'), // 构建输出的静态资源路径
        assetsSubDirectory: 'static',// 构建输出的二级目录
        assetsPublicPath: './', // 构建发布的根目录，可配置为资源服务器域名或 CDN 域名
        productionSourceMap: true,// 是否开启 cssSourceMap
        // Surge or Netlify already gzip all static assets for you.
        // Before setting to `true`, make sure to:
        // npm install --save-dev compression-webpack-plugin
        productionGzip: false,// 默认关闭 gzip，因为很多流行的静态资源主机，例如 Surge、Netlify，已经为所有静态资源开启gzip
        productionGzipExtensions: ['js', 'css']// 需要使用 gzip 压缩的文件扩展名
    },
    dev: {
        env: {
            NODE_ENV: '"development"'
        },
        port: 8016,// 端口号
        assetsSubDirectory: 'static',
        assetsPublicPath: '/', // 编译发布的根目录，可配置为资源服务器域名或 CDN 域名
        context: [ //代理路径
            //          '/member',
            //          '/payapi'
        ],
        proxypath: 'http://127.0.0.1:8081/',// http://cangdu.org:8001/ http://127.0.0.1:8081/ // proxyTable 代理的接口（可跨域）
        // CSS Sourcemaps off by default because relative paths are "buggy"
        // with this option, according to the CSS-Loader README
        // (https://github.com/webpack/css-loader#sourcemaps)
        // In our experience, they generally work as expected,
        // just be aware of this issue when enabling this option.
        cssSourceMap: false
    }
}