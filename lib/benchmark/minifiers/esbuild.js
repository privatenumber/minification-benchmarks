import esbuild from 'esbuild';
import measure from './measure.js';

await measure(async ({ code }) => {
	const minified = await esbuild.transform(code, {
		minify: true,
		sourcemap: false,
	});
	return minified.code;
});
