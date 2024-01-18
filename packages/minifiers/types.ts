export type MinifierFunction = (
	minifySubject: {
		code: string;
		filePath: string;
	},
) => Promise<string>;

export const minifier = (
	minifierFunction: MinifierFunction,
): MinifierFunction => minifierFunction;
