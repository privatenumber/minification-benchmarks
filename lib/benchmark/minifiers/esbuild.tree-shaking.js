import esbuild from 'esbuild';
import measure from './measure.js';

const service = await esbuild.startService();

await measure(async (code) => {
	const minified = (await service.transform(code, {
		minify: true,
		sourcemap: false,
		treeShaking: true,
	}));
	return minified.code;
});

service.stop();
