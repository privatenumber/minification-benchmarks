import 'jsdom-global/register.js';
import assert from 'assert';
import { createElement } from 'react';
import { render } from 'react-dom';
import { artifactMeta } from '../types';
import { requireString } from '../utils/require-string';

export default artifactMeta({
	path: 'antd/dist/antd.js',
	test(code) {
		code = code.replace(/console\.warn\(/g, '(');

		const { Button } = requireString(code);

		const App = () => createElement(Button, null, 'rendered');
		document.body.innerHTML = '<div id="app"></div>';
		render(createElement(App), window.app);

		assert(
			window.app.innerHTML === '<button type="button" class="ant-btn"><span>rendered</span></button>',
		);
	},
});
