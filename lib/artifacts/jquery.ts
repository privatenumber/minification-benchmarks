import 'jsdom-global/register.js';
import assert from 'assert';
import { requireString } from '../utils/require-string';
import { artifactMeta } from '../types';

export default artifactMeta({
	path: 'jquery',
	test(code) {
		const $ = requireString(code);

		document.body.innerHTML = '<div id="findme">Hello</div>';

		assert($('#findme').text() === 'Hello');
	},
});
