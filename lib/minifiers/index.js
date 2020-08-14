const fs = require('fs');
const pMapSeries = require('p-map-series');

const minifiers = fs.readdirSync(__dirname)
	.filter(f => f.endsWith('.js') && f !== 'index.js')
	.sort()
	.map(p => require(`./${p}`));

const runMinifiers = async code => {
	const results = await pMapSeries(minifiers, minifier => minifier.minify(code));
	return results.flat(1);
};

module.exports = {
	minifiers,
	runMinifiers
};
