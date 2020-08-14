const pMapSeries = require('p-map-series');
const {minify} = require('uglify-js');
const {measure} = require('../utils');

module.exports = {
	name: 'uglify-js',
	repo: 'https://github.com/mishoo/UglifyJS',
	minify: async code => pMapSeries([
		{
			name: 'uglify-js - default',
			minify: async () => {
				const minified = await minify(code);
				if (minified.error) {
					throw minified.error;
				}

				return minified.code;
			}
		},
		{
			name: 'uglify-js - no compress',
			minify: async () => {
				const minified = await minify(code, {
					compress: false
				});
				if (minified.error) {
					throw minified.error;
				}

				return minified.code;
			}
		}
	], measure)
};
