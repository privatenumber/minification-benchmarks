import { string } from '@tdewolff/minify';
import { minifier } from '../types.js';

export default minifier(async ({ code }) => {
	const minified = string('application/javascript', code);
	return minified;
});
