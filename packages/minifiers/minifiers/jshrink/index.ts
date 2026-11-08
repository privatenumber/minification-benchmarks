import { createMinifier } from '../../utils/create-minifier.ts';
import { runMinifier } from '../../utils/run-minifier.ts';

const jshrinkPath = new URL('jshrink.php', import.meta.url).pathname;

export default createMinifier(
	'tedivm/jshrink',
	{
		default: async ({ code }) => runMinifier('php', [jshrinkPath], {
			input: code,
		}),
	},
);
