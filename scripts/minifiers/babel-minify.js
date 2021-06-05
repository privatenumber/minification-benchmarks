import babelMinify from 'babel-minify';

export default async ({ code }) => {
	const minified = await babelMinify(code, undefined, {
		sourceMaps: false,
		comments: false,
	});

	return minified.code;
};
