const 
	webpack = require('webpack');

const 
	ExtractTextPlugin = require('extract-text-webpack-plugin'),
	HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
	module: {
		rules: [
			// {
			// 	test: /\.(sass|scss)$/,
			// 	exclude: /node_modules/,
			// 	use: ExtractTextPlugin.extract({
			// 		use: [
			// 			'css-loader',
			// 			'sass-loader'
			// 		]
			// 	})
			// },
			{
				test: /\.css$/,
				exclude: /node_modules/,
				use: ExtractTextPlugin.extract({
					use: [
						'css-loader',
						{
							loader: 'postcss-loader',
							options: {
								plugins: function() {
									return [
										require('postcss-cssnext')
									]
								}
							}
						}
					]
				})
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: [{
					loader: 'babel-loader',
					options: {
						presets: ['es2015', 'stage-2'],
						plugins: ['transform-runtime'],
						cacheDirectory: true
					}
				}]
			},
			{
				test: /\.(jpe?g|png|gif|svg)$/i,
				exclude: /node_modules/,
				use: {
					loader: 'url-loader',
					options: {
						limit: 10000,
						name: 'images/[name].[hash:8].[ext]'
					}
				}
			}
		]
	},

	plugins: [
		// 版权插件
		new webpack.BannerPlugin('<author: minfive; github: https://github.com/Mrminfive>'),

		// js压缩
		// new webpack.optimize.UglifyJsPlugin({
		// 	sourceMap: true
		// }),

		// 提取公用代码
		new webpack.optimize.CommonsChunkPlugin({
			name: ['three', 'manifest'],
			minChunk: function(module) {
				return module.context && module.context.indexOf('node_moudles') !== -1;
			}
		}),

		// 提取css
		new ExtractTextPlugin({
			filename: 'styles.css'
		})
	]
}