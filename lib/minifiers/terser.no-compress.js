import { minify } from 'terser';

export default async ({ code }) => {
	const minified = await minify(code, {
		sourceMap: false,
		compress: false,
		output: {
			comments: false,
		},
	});
	return minified.code;
};
