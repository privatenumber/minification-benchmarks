import { minify } from 'terser';

export default async ({ code }) => {
	const minified = await minify(code, {
		sourceMap: false,
	});
	return minified.code;
};
