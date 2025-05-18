declare module 'google-closure-compiler' {
	interface CompilerOptions {
		js?: string;
	}

	class Compiler {
		constructor(options: CompilerOptions);
		run(
			callback: (exitCode: number, stdOut: string, stdErr: string) => void
		): void;
	}

	export = Compiler;
}
