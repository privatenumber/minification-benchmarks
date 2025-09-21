import 'jsdom-global/register.js';
import assert from 'assert';
import type jquery from 'jquery';
import { defineTest } from '../../utils/define-test.js';

export default defineTest<typeof jquery>({
	run: ($) => {
		document.body.innerHTML = '<div id="findme">Hello</div>';
		assert.ok($('#findme').text() === 'Hello');
	},
});
