var path = require('path')
var config = require('../config')
var utils = require('./utils')
var projectRoot = path.resolve(__dirname, '../')

var env = process.env.NODE_ENV
// check env & config/index.js to decide weither to enable CSS Sourcemaps for the
// various preprocessor loaders added to vue-loader at the end of this file
var cssSourceMapDev = (env === 'development' && config.dev.cssSourceMap)
var cssSourceMapProd = (env === 'production' && config.build.productionSourceMap)
var useCssSourceMap = cssSourceMapDev || cssSourceMapProd

module.exports = {
	entry: { // webpack入口文件
		app: './src/main.js'
	},
	output: {
		path: config.build.assetsRoot, // 编译输出的静态资源根路径
		publicPath: process.env.NODE_ENV === 'production' ? config.build.assetsPublicPath : config.dev.assetsPublicPath, // 正式发布环境下编译输出的上线路径的根路径
		filename: '[name].js' // 编译输出的文件名
	},
	resolve: {
		extensions: ['', '.js', '.vue', '.less', '.css', '.scss'], // 自动补全的扩展名
		fallback: [path.join(__dirname, '../node_modules')],
		alias: { // 路径别名 例如 import Vue from 'vue'，会自动到 'vue/dist/vue.common.js'中寻找
			'vue$': 'vue/dist/vue.common.js',
			'src': path.resolve(__dirname, '../src'),
			'assets': path.resolve(__dirname, '../src/assets'),
			'components': path.resolve(__dirname, '../src/components')
		}
	},
	resolveLoader: {
		fallback: [path.join(__dirname, '../node_modules')]
	},
	module: { // 不同类型模块的处理规则
		loaders: [{
			test: /\.vue$/, // 处理 vue文件
			loader: 'vue'
		}, {
			test: /\.js$/, // 编译 js将es6+的代码转成es5
			loader: 'babel',
			include: projectRoot,
			exclude: /node_modules/
		}, {
			test: /\.json$/,
			loader: 'json'
		}, {
			test: /\.(png|jpe?g|svg)(\?.*)?$/, // 处理图片文件
			loader: 'url',
			query: {
				limit: 10000, // 小于10K的图片转成base64编码的dataURL字符串写到代码中
				name: utils.assetsPath('img/[name].[ext]')
			}
		}, {
			test: /\.gif$/, // gif图片不转为base64否则无法出现动画
			loader: 'file'
		}, {
			test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/, // 处理字体文件
			loader: 'url',
			query: {
				limit: 10000, 
				name: utils.assetsPath('fonts/[name].[hash:7].[ext]') // 其他的图片转移到静态资源文件夹
			}
		}]
	},
	vue: {
		loaders: utils.cssLoaders({
			sourceMap: useCssSourceMap
		}),
		postcss: [
			require('autoprefixer')({ // 自动增加css前缀
				browsers: ['last 10 versions']
			})
		]
	}
}