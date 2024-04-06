import 'jsdom-global/register.js';
import assert from 'assert';
import { defineTest } from '../../utils/define-test.js';

export default defineTest<typeof import('jquery')>({
	run: ($) => {
		document.body.innerHTML = '<div id="findme">Hello</div>';
		assert($('#findme').text() === 'Hello');
	},
});
