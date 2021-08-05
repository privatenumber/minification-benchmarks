import 'jsdom-global/register.js';
import assert from 'assert';
import { render } from 'react-dom';
import { requireString } from '../utils/require-string';
import { artifactMeta } from '../types';

export default artifactMeta({
	path: 'react/cjs/react.development.js',
	test(code) {
		const React = requireString(code);

		const App = () => React.createElement('div', null, 'rendered');
		document.body.innerHTML = '<div id="app"></div>';
		render(React.createElement(App), window.app);

		assert(window.app.innerHTML === '<div>rendered</div>');
	},
});
