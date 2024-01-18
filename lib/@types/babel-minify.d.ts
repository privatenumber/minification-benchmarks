declare module 'babel-minify' {
	export default function babelMinify(
		code: string,
		minifyOptions: Record<string, unknown> | undefined,
		overrides?: {
			sourceMaps?: boolean;
			comments?: boolean;
		},
	): { code: string };
}
