var config = require('../config')
var webpack = require('webpack')
var merge = require('webpack-merge') // webpack配置合并(数组和对象)插件
var utils = require('./utils') // 工具函数集合
var baseWebpackConfig = require('./webpack.base.conf') // webpac基本配置
var HtmlWebpackPlugin = require('html-webpack-plugin') // 自动生成 html 并且注入到 .html 文件中的插件

// 将 Hol-reload 热重载的客户端代码添加到 webpack.base.conf 的 对应 entry 中，一起打包
Object.keys(baseWebpackConfig.entry).forEach(function(name) {
	baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
})

module.exports = merge(baseWebpackConfig, {
	module: {
		// 样式文件的处理规则，对css/sass/scss等不同内容使用相应的styleLoaders
		// 由utils配置出各种类型的预处理语言所需要使用的loader，例如sass需要使用sass-loader
		loaders: utils.styleLoaders({
			sourceMap: config.dev.cssSourceMap
		})
	},
	// 最新的配置为 cheap-module-eval-source-map，虽然 cheap-module-eval-source-map更快，但它的定位不准确，所以换成 eval-source-map
	devtool: '#eval-source-map',
	// devtool: '#source-map', // 可以在vue组件上打断点
	plugins: [
		// definePlugin 接收字符串插入到代码当中, 所以你需要的话可以写上 JS 的字符串
		// 此处，插入适当的环境
		new webpack.DefinePlugin({
			'process.env': config.dev.env
		}),
		// 为组件和模块分配ID，分析和优先考虑使用最多的模块，并为它们分配最小的ID，通过分析ID，可以建议降低总文件的大小
		new webpack.optimize.OccurenceOrderPlugin(),
		// 开启webpack热更新功能
		// HotModule 插件在页面进行变更的时候只会重绘对应的页面模块，不会重绘整个 html 文件
		new webpack.HotModuleReplacementPlugin(),
		// webpack编译过程中出错的时候跳过报错阶段，不会阻塞编译，在编译结束后报错
		new webpack.NoErrorsPlugin(),
		// 自动将依赖注入html模板，并输出最终的html文件到目标文件夹(将 index.html 作为入口，注入 html 代码后生成 index.html文件)
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: 'index.html',
			favicon: 'favicon.ico',
			inject: true
		})
	]
})