import { string } from '@tdewolff/minify';
import { createMinifier } from '../utils/create-minifier.js';

export default createMinifier(async ({ code }) => {
	const minified = string('application/javascript', code);
	return minified;
});
