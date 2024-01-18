export type MinifierFunction = (
	minifySubject: {
		code: string;
		filePath: string;
	},
) => Promise<string>;

export const createMinifier = (
	minifierFunction: MinifierFunction,
): MinifierFunction => {

	return minifierFunction;
};
