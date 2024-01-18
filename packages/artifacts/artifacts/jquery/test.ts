import 'jsdom-global/register.js';
import assert from 'assert';
import { defineTest } from '../..';

export default defineTest({
	run($) {
		document.body.innerHTML = '<div id="findme">Hello</div>';
		assert($('#findme').text() === 'Hello');
	},
});
