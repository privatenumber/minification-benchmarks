const pMapSeries = require('p-map-series');
const babelMinify = require('babel-minify');
const {measure} = require('../utils');

module.exports = {
	name: 'babel-minify',
	repo: 'https://github.com/babel/minify',
	minify: code => measure({
		name: 'babel-minify - default',
		minify: async () => {
			const minified = await babelMinify(code);
			return minified.code;
		}
	}),
};
