import esbuild from 'esbuild';

export default await (async ({ code }) => {
	const minified = await esbuild.transform(code, {
		minify: true,
		sourcemap: false,
	});

	return minified.code;
});
