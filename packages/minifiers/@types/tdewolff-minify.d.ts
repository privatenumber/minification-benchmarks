declare module '@tdewolff/minify' {
	export function minify(
		mediatype: string,
		code: string,
	): Promise<string>;
}
