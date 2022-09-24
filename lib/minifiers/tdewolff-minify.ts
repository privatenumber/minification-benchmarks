import { string } from '@tdewolff/minify';
import { minifier } from '../types';

export default minifier(async ({ code }) => {
	const minified = string('application/javascript', code);

	return minified.toString();
});
