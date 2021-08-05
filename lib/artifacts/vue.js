import { artifactMeta } from '../types';
import assert from 'assert';
import { Volume } from 'memfs';
import { createFsRequire } from 'fs-require';
import 'jsdom-global/register';

export default artifactMeta({
	path: 'vue/dist/vue.runtime.common.dev.js',
	test(code) {
		const vol = Volume.fromJSON({ '/index.js': code });
		const fsRequire = createFsRequire(vol);
		const Vue = fsRequire('/index');
		Vue.config.devtools = false;
		Vue.config.productionTip = false;

		document.body.innerHTML = `<div id="app"></div>`;
		new Vue({
			el: '#app',
			render: h => h('div', ['rendered']),
		});

		assert(document.body.innerHTML === '<div>rendered</div>');
	},
});
