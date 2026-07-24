import spawn from 'nano-spawn';

export const runNode = (
	code: string,
	signal: AbortSignal,
) => spawn(
	process.execPath,
	[
		'--input-type=module',
		'--eval',
		code,
	],
	{ signal },
);
