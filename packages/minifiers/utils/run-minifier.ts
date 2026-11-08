import spawn, { SubprocessError } from 'nano-spawn';

export const runMinifier = async (
	command: string,
	args: string[],
	options: {
		input?: string;
	} = {},
) => {
	try {
		const result = await spawn(command, args, {
			stdin: options.input === undefined ? 'ignore' : { string: options.input },
		});
		// nano-spawn strips one trailing LF or CRLF from stdout.
		return result.stdout;
	} catch (error) {
		if (error instanceof SubprocessError && (error.stderr || error.cause instanceof Error)) {
			const { stack } = error;
			error.message = [
				error.stderr.trimEnd(),
				error.message,
				error.cause instanceof Error ? error.cause.message : '',
			].filter(Boolean).join('\n');
			error.stack = stack;
		}
		throw error;
	}
};
