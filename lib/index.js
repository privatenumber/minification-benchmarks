import fs from 'fs/promises';
import path from 'path';
import Listr from 'listr';
import { getVersion } from './utils.js';
import benchmark from './benchmark/index.js';
import updateReadme from './update-readme.js';

(async () => {
	(new Listr([
		benchmark,
		updateReadme,
	])).run({
		artifacts: await Promise.all([
			{
				moduleName: 'lodash',
				path: 'lodash',
			},
			{
				moduleName: 'three',
				path: 'three',
			},
			{
				moduleName: 'vue',
				path: 'vue/dist/vue.runtime.common.dev.js',
			},
			{
				moduleName: 'react',
				path: 'react/cjs/react.development.js',
			},
			{
				moduleName: 'moment',
				path: 'moment',
			},
			{
				moduleName: 'd3',
				path: 'd3/dist/d3.js',
			},
			{
				moduleName: 'jquery',
				path: 'jquery',
			},
			{
				moduleName: 'terser',
				path: path.resolve('node_modules/terser/dist/bundle.min.js'),
			},
		].sort((a, b) => a.moduleName.localeCompare(b.moduleName)).map(async (m) => {
			const modulePath = m.path.startsWith('/') ? m.path : require.resolve(m.path);
			return {
				moduleName: m.moduleName,
				version: await getVersion(m.moduleName),
				modulePath,
				code: await fs.readFile(modulePath),
			};
		})),
	}).catch((error) => {
		console.log(error);
		return error.context;
	});
})();
