import { getMinifiers, loadMinifier } from './index.js';

(async () => {
	// const { default: terser } = await import('./minifiers/terser.js');
	// await terser.loadMeta();
	// console.log(terser);

	const minifierNames = await getMinifiers();

	const minifiers = await Promise.all(minifierNames.map(loadMinifier));

	console.log(minifiers);
})();