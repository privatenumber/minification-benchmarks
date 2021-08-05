import 'jsdom-global/register.js';
import assert from 'assert';
import { requireString } from '../utils/require-string';
import { artifactMeta } from '../types';

export default artifactMeta({
	path: 'vue/dist/vue.runtime.common.dev.js',
	test(code) {
		const Vue = requireString(code);
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
