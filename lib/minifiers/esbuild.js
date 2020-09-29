const pMapSeries = require('p-map-series');
const esbuild = require('esbuild');
const {measure} = require('../utils');

module.exports = {
	name: 'esbuild',
	repo: 'https://github.com/evanw/esbuild',
	minify: async code => {
		const service = await esbuild.startService();

		const result = await measure({
			name: 'esbuild',
			minify: async () => (await service.transform(code, {minify: true})).js
		});

		service.stop();

		return result;
	}
};
