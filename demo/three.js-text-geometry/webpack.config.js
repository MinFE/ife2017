const path = require('path');

const 
	HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: {
		main: path.resolve(__dirname, 'src/app.js'),
		three: 'three'
	},
	output: {
		filename: '[name].[chunkhash].js',
		path: path.resolve(__dirname, 'dist')
	},

	plugins: [
		// html模板
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, 'index.html')
		}),
	]
}