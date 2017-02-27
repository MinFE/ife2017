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

webpack(webpackMerge(baseConfig, config), (err, stats) => {
	if (err) {
		console.error(err);
	}
	console.log(stats);
});