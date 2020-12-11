import { promises as fs } from 'fs';
import Listr from 'listr';
import { resolveModule, getVersion } from './utils.js';
import benchmark from './benchmark/index.js';
import updateReadme from './update-readme.js';

const { results } = await (new Listr([
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
			path: 'terser',
		},
	].sort().map(async (m) => {
		const path = await resolveModule(m.path);
		return {
			moduleName: m.moduleName,
			version: await getVersion(m.moduleName),
			path,
			code: await fs.readFile(path),
		};
	})),
}).catch(err => {
	console.log(err);
	return err.context;
});
