var path = require('path')
var config = require('../config')
var utils = require('./utils')
var webpack = require('webpack')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')
var ExtractTextPlugin = require('extract-text-webpack-plugin') // 提取css的插件
var HtmlWebpackPlugin = require('html-webpack-plugin') // 自动生成 html 并且注入到 .html 文件中的插件
var env = config.build.env

var webpackConfig = merge(baseWebpackConfig, {
	module: {
		loaders: utils.styleLoaders({
			sourceMap: config.build.productionSourceMap,
			extract: true
		})
	},
	//devtool: config.build.productionSourceMap ? '#source-map' : false,
	output: {
		path: config.build.assetsRoot,
		filename: utils.assetsPath('js/[name].js'),
		chunkFilename: utils.assetsPath('js/[name].[chunkhash].min.js')
	},
	vue: {
		loaders: utils.cssLoaders({
			sourceMap: config.build.productionSourceMap,
			extract: true
		})
	},
	plugins: [
		// http://vuejs.github.io/vue-loader/en/workflow/production.html
		new webpack.DefinePlugin({
			'process.env': env
		}),
		new webpack.optimize.UglifyJsPlugin({ // 压缩 js
			compress: {
				warnings: false
			}
		}),
		// 为组件和模块分配ID，分析和优先考虑使用最多的模块，并为它们分配最小的ID，通过分析ID，可以建议降低总文件的大小
		new webpack.optimize.OccurrenceOrderPlugin(),
		// 提取 css
		new ExtractTextPlugin(utils.assetsPath('css/[name].css')),
		// 自动将依赖注入html模板，并输出最终的html文件到目标文件夹(将 index.html 作为入口，注入 html 代码后生成 index.html文件)
		new HtmlWebpackPlugin({
			filename: config.build.index,
			template: 'index.html',
			inject: true,
			// minify: {
			//     removeComments: true,
			//     collapseWhitespace: true,
			//     removeAttributeQuotes: true
			//         // more options:
			//         // https://github.com/kangax/html-minifier#options-quick-reference
			// },
			// necessary to consistently work with multiple chunks via CommonsChunkPlugin
			chunksSortMode: 'dependency'
		}),
		// 分割公共 js 到独立的文件
		new webpack.optimize.CommonsChunkPlugin({
			name: 'vendor',
			minChunks: function(module, count) {
				// any required modules inside node_modules are extracted to vendor
				return(
					module.resource &&
					/\.js$/.test(module.resource) &&
					module.resource.indexOf(
						path.join(__dirname, '../node_modules')
					) === 0
				)
			}
		}),
		// 将webpack runtime 和模块清单 提取到独立的文件，以防止当 app包更新时导致公共 jsd hash也更新
		new webpack.optimize.CommonsChunkPlugin({
			name: 'manifest',
			chunks: ['vendor']
		})
	]
})

// 开启 gzip 的情况时，给 webpack plugins添加 compression-webpack-plugin 插件
if(config.build.productionGzip) {
	var CompressionWebpackPlugin = require('compression-webpack-plugin') // webpack 压缩插件

// 向webpackconfig.plugins中加入下方的插件
	webpackConfig.plugins.push(
		new CompressionWebpackPlugin({
			asset: '[path].gz[query]',
			algorithm: 'gzip',
			test: new RegExp(
				'\\.(' +
				config.build.productionGzipExtensions.join('|') +
				')$'
			),
			threshold: 10240,
			minRatio: 0.8
		})
	)
}

module.exports = webpackConfig