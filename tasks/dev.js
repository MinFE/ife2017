const 
	path = require('path'),
	webpack = require('webpack'),
	webpackServer = require('webpack-dev-server');
	webpackMerge = require('webpack-merge');

const baseConfig = require('../webpack.config.base.js');

const 
	argvs = process.argv,
	reg = '--src:';

const _src = argvs.reduce((p, argv) => {
	return argv.match(reg) ? argv.replace(reg, '') : p;
}, '');

let config = require(path.join('..', _src, 'webpack.config.js'));

const compiler = webpack(webpackMerge(baseConfig, config, {
	resolve: {
		alias: {
			Static: path.resolve(__dirname, path.join('..', _src, 'src', 'static')),
		}
	}
}), (err, stats) => {
	if (err) {
		console.error(err);
	}
	
	process.stdout.write(stats.toString({
		color: true,
		modules: false,
		children: false,
		chunks: false,
		chunkModules: false
	}) + '\n');
});

const server = new webpackServer(compiler, {
	stats: {
		colors: true
	},
	contentBase: path.resolve(__dirname, path.join('..', _src, 'src')),
	staticOptions: {
		redirect: false
	}
});

server.listen(8899, '127.0.0.1', () => {
	console.log('Starting server on http://127.0.0.1:8899');
})