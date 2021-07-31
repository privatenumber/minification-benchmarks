import swc from '@swc/core';

export default async ({ code }) => {
	const minified = await swc.minify(code, {
		mangle: true,
		compress: true,
		sourceMaps: false,
	});
	return minified.code;
};
