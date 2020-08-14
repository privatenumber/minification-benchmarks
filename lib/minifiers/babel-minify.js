const pMapSeries = require('p-map-series');
const babelMinify = require('babel-minify');
const { measure } = require('../utils');

module.exports = {
	name: 'babel-minify',
	repo: 'https://github.com/babel/minify',
	minify: async (code) => pMapSeries([{
		name: 'babel-minify - default',
		minify: async () => {
			const minified = await babelMinify(code);
			return minified.code;
		},
	}], measure),
};
