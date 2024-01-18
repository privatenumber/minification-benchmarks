
declare module 'babel-minify' {
	export default function babelMinify(
		code: string,
		minifyOptions: Record<string, any> | undefined,
		overrides?: {
			sourceMaps?: boolean;
			comments?: boolean;
		},
	): { code: string }
}
