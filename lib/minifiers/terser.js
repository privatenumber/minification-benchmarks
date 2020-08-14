const pMapSeries = require('p-map-series');
const {minify} = require('terser');
const {measure} = require('../utils');

module.exports = {
	name: 'terser',
	repo: 'https://github.com/terser/terser',
	minify: async code => pMapSeries([
		{
			name: 'terser - default',
			minify: async () => (await minify(code)).code
		},
		{
			name: 'terser - no compress',
			minify: async () => (await minify(code, {
				compress: false
			})).code
		}
	], measure)
};
