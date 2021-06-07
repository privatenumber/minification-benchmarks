import swc from '@swc/core';

export default async ({ code }) => {
	const minified = await swc.transform(code, {
		minify: true,
		sourceMaps: false,
		swcrc: false,
	});
	return minified.code;
};
