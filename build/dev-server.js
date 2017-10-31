var config = require('../config')
// 如果 Node 的环境无法判断当前是 dev / product 环境
// 使用 config.dev.env.NODE_ENV 作为当前的环境
if (!process.env.NODE_ENV) process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
var path = require('path')// node自带的文件路径工具
var express = require('express')
var webpack = require('webpack')
var opn = require('opn') // 可以强制打开浏览器并跳转到指定 url 的插件
var proxyMiddleware = require('http-proxy-middleware')
var webpackConfig = require('./webpack.dev.conf')

// 端口号为命令行输入的PORT参数或者配置文件中的默认值
var port = process.env.PORT || config.dev.port
    // Define HTTP proxies to your custom API backend
    // https://github.com/chimurai/http-proxy-middleware

var server = express()
var compiler = webpack(webpackConfig)
// 可以将编译后的文件暂存到内存中的插件
var devMiddleware = require('webpack-dev-middleware')(compiler, {
    publicPath: webpackConfig.output.publicPath,// 公共路径，与webpack的publicPath一样
    stats: {
        colors: true,
        chunks: false
    }
})
// Hot-reload 热重载插件
var hotMiddleware = require('webpack-hot-middleware')(compiler)
// 当tml-webpack-plugin template更改之后，强制刷新浏览器
compiler.plugin('compilation', function(compilation) {
    compilation.plugin('html-webpack-plugin-after-emit', function(data, cb) {
        hotMiddleware.publish({
            action: 'reload'
        })
        cb()
    })
})

var context = config.dev.context

switch(process.env.NODE_ENV){
    case 'local': var proxypath = 'http://localhost:8001'; break;
    case 'online': var proxypath = config.dev.proxypath; break;
    default:  var proxypath = config.dev.proxypath; 
}
var options = {
    target: proxypath,
    changeOrigin: true,
}
//  将 proxyTable 中的请求配置挂在到启动的 express 服务上
if (context.length) {
    server.use(proxyMiddleware(context, options))
}

// 使用 connect-history-api-fallback 匹配资源，如果不匹配就可以重定向到指定地址
server.use(require('connect-history-api-fallback')())

// 将暂存到内存中的 webpack 编译后的文件挂在到 express 服务上
server.use(devMiddleware)

// 将 Hot-reload 挂在到 express 服务上
server.use(hotMiddleware)

// 拼接 static 文件夹的静态资源路径
var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
// 静态文件服务
server.use(staticPath, express.static('./static'))

module.exports = server.listen(port, function(err) {
    if (err) {
        console.log(err)
        return
    }
    var uri = 'http://localhost:' + port // http://10.101.90.59:(本地IP) http://localhost:
    console.log('Listening at ' + uri + '\n')

    // 如果不是测试环境，则自动打开浏览器并跳到我们的开发地址
    if (process.env.NODE_ENV !== 'testing') {
        opn(uri)
    }
})