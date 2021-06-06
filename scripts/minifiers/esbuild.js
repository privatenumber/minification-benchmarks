import esbuild from 'esbuild';

export default async ({ code }) => {
	const minified = await esbuild.transform(code, {
		minify: true,
		sourcemap: false,
		legalComments: 'none',
	});

	return minified.code;
};
