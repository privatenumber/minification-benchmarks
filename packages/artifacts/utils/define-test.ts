export type Test<T = unknown> = {
	preprocess?: (code: string) => string;
	run: (exports: T) => void;
};

export const defineTest = <T>(
	test: Test<T>,
) => test;
