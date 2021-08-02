import swc from '@swc/core';

export default async ({ code }) => {
	const minified = await swc.minify(code, {
		compress: false,
		mangle: true,
		sourceMap: false,
	});
	return minified.code;
};
