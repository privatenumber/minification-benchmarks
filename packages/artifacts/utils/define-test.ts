export const defineTest = <T>(
	test: {
		preprocess?: (code: string) => string;
		run: (exports: T) => void;
	},
) => test;
