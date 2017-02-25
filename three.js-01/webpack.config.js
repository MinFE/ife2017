const path = require('path');

const 
	ExtractTextPlugin = require('extract-text-webpack-plugin'),
	HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: {
		main: path.resolve(__dirname, 'src/index.js'),
		three: 'three.js'
	},
	output: {
		filename: '[name].[chunkhash].js',
		path: path.resolve(__dirname, 'dist')
	},

	plugins: [
		// html模板
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, 'index.html')
		})
	]
}