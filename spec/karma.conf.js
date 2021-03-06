module.exports = function(config) {
	var _ = require('lodash');
	
	/**
	 * Systemjs needs paths resolved, Karma needs
	 * a list of files loaded. Load order matters to
	 * SystemJS. So we share that config here.
	 */
	var files = [];
	var nodeDir = '/base/node_modules';
	var bowerDir = '/base/bower_components';
	var srcDir = '/base/src/js';
	var paths = {
		'babel': nodeDir + '/babel-core/browser.js',
		'jquery': bowerDir + '/jquery/dist/jquery.js',
		'bsp-utils': bowerDir + '/bsp-utils/bsp-utils.js',
		'bsp-form': srcDir + '/bsp-form.js'
	};
	_.map(paths, function(val) {
		files.push(val.replace(/^\/base\//, ''));
	});
	files = files.concat([
		'src/js/**/*.js',
		'spec/unit/**/*.js'
	]);

	config.set({
		autoWatch: true,
		basePath: '..',
		browsers: ['PhantomJS'],
		captureConsole: true,
		files: [],
		frameworks: ['systemjs','jasmine'],
		plugins: [
			require('karma-jasmine'),
			require('karma-phantomjs-launcher'),
			require('karma-systemjs')
		],
		systemjs: {
			configFile: 'spec/config.js',
			config: {
				paths: paths,
				transpiler: 'babel'
			},
			files: files
		}
	});
};