export type Test<T = unknown> = {
	preprocess?: (code: string) => string;
	run: (exports: T) => void | Promise<void>;
};

export const defineTest = <T>(
	test: Test<T>,
) => test;
