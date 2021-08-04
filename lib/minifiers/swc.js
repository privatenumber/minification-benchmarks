import swc from '@swc/core';

export default async ({ code }) => {
	const minified = await swc.minify(code, {
		compress: true,
		mangle: true,
		sourceMap: false,
	});
	return minified.code;
};
