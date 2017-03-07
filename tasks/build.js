require('shelljs/global');

const 
	path = require('path'),
	webpack = require('webpack'),
	webpackMerge = require('webpack-merge');

const baseConfig = require('../webpack.config.base.js');

const 
	argvs = process.argv,
	reg = '--src:';

const _src = argvs.reduce((p, argv) => {
	return argv.match(reg) ? argv.replace(reg, '') : p;
}, '');

let config = require(path.join('..', _src, 'webpack.config.js'));

rm('-rf', path.join(_src, 'dist'));
cp('-R', path.join(_src, 'src', 'static'), path.join(_src, 'dist', 'static'));

webpack(webpackMerge(baseConfig, config, {
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