const terser = require('./terser');
const esbuild = require('./esbuild');

module.exports = async (code) => [
	...await terser(code),
	...await esbuild(code),
];
