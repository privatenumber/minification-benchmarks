import esbuild from 'esbuild';
import { minifier } from '../types';

export default minifier(async ({ code }) => {
	const minified = await esbuild.transform(code, {
		minify: true,
		sourcemap: false,
		legalComments: 'none',
		format: 'cjs',
	});

	return minified.code;
});
