import { getMinifiers, loadMinifier } from './index.js';

(async () => {
	const minifierNames = await getMinifiers();

	const minifiers = await Promise.all(minifierNames.map(loadMinifier));

	const markdown = minifiers.map(
		(minifier) => `- [${minifier.meta.name}](${minifier.meta.repository}) v${minifier.meta.version}`,
	).join('\n');
	console.log(markdown);
})();
