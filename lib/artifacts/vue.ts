import assert from 'assert';
import { Volume } from 'memfs';
import { createFsRequire } from 'fs-require';
import { artifactMeta } from '../types';
import 'jsdom-global/register.js';

export default artifactMeta({
	path: 'vue/dist/vue.runtime.common.dev.js',
	test(code) {
		const vol = Volume.fromJSON({ '/index.js': code });
		const fsRequire = createFsRequire(vol);
		const Vue = fsRequire('/index');
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
