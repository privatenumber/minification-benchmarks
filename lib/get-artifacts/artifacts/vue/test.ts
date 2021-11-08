import 'jsdom-global/register.js';
import assert from 'assert';
import { defineTest } from '../..';

export default defineTest({
	run(Vue) {
		Vue.config.devtools = false;
		Vue.config.productionTip = false;

		document.body.innerHTML = '<div id="app"></div>';

		// eslint-disable-next-line no-new
		new Vue({
			el: '#app',
			render: h => h('div', ['rendered']),
		});

		assert(document.body.innerHTML === '<div>rendered</div>');
	},
});
