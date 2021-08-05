import assert from 'assert';
import { Volume } from 'memfs';
import { createFsRequire } from 'fs-require';
import { createElement } from 'react';
import { render } from 'react-dom';
import { artifactMeta } from '../types';
import 'jsdom-global/register.js';

export default artifactMeta({
	path: 'antd/dist/antd.js',
	test(code) {
		code = code.replace(/console\.warn\(/g, '(');

		const vol = Volume.fromJSON({ '/index.js': code });
		const fsRequire = createFsRequire(vol);
		const { Button } = fsRequire('/index');

		const App = () => createElement(Button, null, 'rendered');
		document.body.innerHTML = '<div id="app"></div>';
		render(createElement(App), window.app);

		assert(
			window.app.innerHTML === '<button type="button" class="ant-btn"><span>rendered</span></button>',
		);
	},
});
