var path = require('path')
var config = require('../config')
var ExtractTextPlugin = require('extract-text-webpack-plugin') // 提取css的插件

exports.assetsPath = function(_path) { // 生成静态资源的路径
	var assetsSubDirectory = process.env.NODE_ENV === 'production' ? config.build.assetsSubDirectory : config.dev.assetsSubDirectory
	return path.posix.join(assetsSubDirectory, _path)
}

exports.cssLoaders = function(options) { // 生成css、sass、scss等各种用来编写样式的语言所对应的loader配置
	options = options || {}
	// 生成各种loader配置，并且配置了extract-text-pulgin
	function generateLoaders(loaders) {
		var sourceLoader = loaders.map(function(loader) {
			var extraParamChar
			if(/\?/.test(loader)) {
				loader = loader.replace(/\?/, '-loader?')
				extraParamChar = '&'
			} else {
				loader = loader + '-loader'
				extraParamChar = '?'
			}
			return loader + (options.sourceMap ? extraParamChar + 'sourceMap' : '')
		}).join('!')

		// (which is the case during production build)
		if(options.extract) {
			return ExtractTextPlugin.extract('vue-style-loader', sourceLoader)
		} else {
			return ['vue-style-loader', sourceLoader].join('!')
		}
	}

	// http://vuejs.github.io/vue-loader/en/configurations/extract-css.html
	return {
		css: generateLoaders(['css']),
		postcss: generateLoaders(['css']),
		less: generateLoaders(['css', 'less']),
		sass: generateLoaders(['css', 'sass?indentedSyntax']),
		scss: generateLoaders(['css', 'sass']),
		stylus: generateLoaders(['css', 'stylus']),
		styl: generateLoaders(['css', 'stylus'])
	}
}

// 生成处理单独的.css、.sass、.scss等样式文件的规则
exports.styleLoaders = function(options) {
	var output = []
	var loaders = exports.cssLoaders(options)
	for(var extension in loaders) {
		var loader = loaders[extension]
		output.push({
			test: new RegExp('\\.' + extension + '$'),
			loader: loader
		})
	}
	return output
}