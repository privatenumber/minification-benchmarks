import { artifactMeta } from '../types';
import assert from 'assert';
import { Volume } from 'memfs';
import { createFsRequire } from 'fs-require';
import { render } from 'react-dom';
import 'jsdom-global/register';

export default artifactMeta({
	path: 'react/cjs/react.development.js',
	test(code) {
		const vol = Volume.fromJSON({ '/index.js': code });
		const fsRequire = createFsRequire(vol);
		const React = fsRequire('/index');

		const App = () => React.createElement('div', null, 'rendered');
		document.body.innerHTML = `<div id="app"></div>`;
		render(React.createElement(App), window.app);

		assert(window.app.innerHTML === '<div>rendered</div>');
	},
});
