import spawn, { SubprocessError } from 'nano-spawn';

export const runMinifier = async (
	command: string,
	args: string[],
	options: {
		input?: string;
		cwd?: string;
	} = {},
) => {
	try {
		const result = await spawn(command, args, {
			cwd: options.cwd,
			stdin: options.input === undefined ? 'ignore' : { string: options.input },
		});
		// nano-spawn strips one trailing LF or CRLF from stdout.
		return result.stdout;
	} catch (error) {
		if (error instanceof SubprocessError && error.stderr) {
			const [message, ...stackLines] = error.stderr.split('\n');
			const minifierError = new Error(message);
			minifierError.stack = [minifierError.toString(), ...stackLines].join('\n');
			throw minifierError;
		}
		throw error;
	}
};
