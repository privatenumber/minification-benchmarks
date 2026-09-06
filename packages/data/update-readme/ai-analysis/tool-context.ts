/**
 * Curated, verified context about each benchmarked minifier configuration.
 *
 * Performance opinions do not belong here — everything here is a durable,
 * sourced fact about what a tool is and what its benchmark configuration
 * actually enables. Benchmark options are taken from the adapter in
 * `packages/minifiers/minifiers/`; tool facts come from the linked sources.
 */
type ToolContext = {
	toolName: string;
	description: string;
	implementationLanguage: string;

	/** Behavior of each benchmark configuration, keyed by its exact benchmark name. */
	configurations: Record<string, string>;
	sources: readonly string[];
};

const tools: ToolContext[] = [
	{
		toolName: '@swc/core',
		description: 'SWC, a TypeScript/JavaScript compiler toolchain.',
		implementationLanguage: 'Rust',
		configurations: {
			'@swc/core': 'Full minification: compression and identifier mangling both enabled.',
		},
		sources: [
			'packages/minifiers/minifiers/swc.ts',
			'https://swc.rs/',
		],
	},
	{
		toolName: 'oxc-minify',
		description: 'Oxc, a JavaScript/TypeScript toolchain written as a collection of Rust components.',
		implementationLanguage: 'Rust',
		configurations: {
			'oxc-minify': 'Full minification with Oxc’s default minify options.',
		},
		sources: [
			'packages/minifiers/minifiers/oxc-minify.ts',
			'https://oxc.rs/',
		],
	},
	{
		toolName: '@tdewolff/minify',
		description: 'The tdewolff/minify minifier, shipped to npm compiled to WebAssembly.',
		implementationLanguage: 'Go',
		configurations: {
			'@tdewolff/minify': 'Full minification with default options.',
		},
		sources: [
			'packages/minifiers/minifiers/tdewolff-minify.ts',
			'https://github.com/tdewolff/minify',
		],
	},
	{
		toolName: 'esbuild',
		description: 'esbuild, a JavaScript bundler and minifier.',
		implementationLanguage: 'Go',
		configurations: {
			esbuild: 'Full minification via `transform`: minify enabled, tree-shaking enabled, legal comments removed.',
		},
		sources: [
			'packages/minifiers/minifiers/esbuild.ts',
			'https://esbuild.github.io/',
		],
	},
	{
		toolName: 'bun',
		description: 'Bun’s JavaScript/TypeScript toolchain, run as a local binary.',
		implementationLanguage: 'Zig and C++',
		configurations: {
			bun: 'Single-file minification via `bun build --minify --no-bundle`.',
		},
		sources: [
			'packages/minifiers/minifiers/bun.ts',
			'https://bun.com/',
		],
	},
	{
		toolName: 'terser',
		description: 'Terser, a JavaScript mangler and compressor.',
		implementationLanguage: 'JavaScript',
		configurations: {
			terser: 'Full minification: compression and identifier mangling enabled, comments removed.',
			'terser (no compress)': 'Only the `compress` option is disabled. Identifier mangling stays enabled, so output is still mangled — this is not whitespace-only minification.',
		},
		sources: [
			'packages/minifiers/minifiers/terser.ts',
			'https://github.com/terser/terser',
		],
	},
	{
		toolName: 'uglify-js',
		description: 'UglifyJS, a JavaScript parser, mangler, and compressor.',
		implementationLanguage: 'JavaScript',
		configurations: {
			'uglify-js': 'Full minification: compression and identifier mangling enabled (UglifyJS defaults).',
			'uglify-js (no compress)': 'Only the `compress` option is disabled. Identifier mangling stays enabled — this is not whitespace-only minification.',
		},
		sources: [
			'packages/minifiers/minifiers/uglify-js.ts',
			'https://github.com/mishoo/UglifyJS',
		],
	},
	{
		toolName: 'babel-minify',
		description: 'babel-minify, an ES6+ aware minifier built on the Babel toolchain.',
		implementationLanguage: 'JavaScript',
		configurations: {
			'babel-minify': 'Full babel-minify preset with default options; comments removed.',
		},
		sources: [
			'packages/minifiers/minifiers/babel-minify.ts',
			'https://github.com/babel/minify',
		],
	},
	{
		toolName: 'google-closure-compiler',
		description: 'Closure Compiler, Google’s JavaScript optimizer.',
		implementationLanguage: 'Java',
		configurations: {
			'google-closure-compiler': 'SIMPLE compilation level (not ADVANCED), ECMAScript Next input and output, polyfill rewriting and source-map handling disabled.',
		},
		sources: [
			'packages/minifiers/minifiers/google-closure-compiler.ts',
			'https://github.com/google/closure-compiler',
		],
	},
	{
		toolName: '@cminify/cminify-linux-x64',
		description: 'cminify, a minifier for CSS, JavaScript, XML, HTML, and JSON.',
		implementationLanguage: 'C',
		configurations: {
			'@cminify/cminify-linux-x64': 'Standalone binary run as a child process with default options.',
		},
		sources: [
			'packages/minifiers/minifiers/cminify.ts',
			'https://codeberg.org/Jumping-Beaver/cminify',
		],
	},
	{
		toolName: 'tedivm/jshrink',
		description: 'JShrink, a JavaScript minifier library for PHP.',
		implementationLanguage: 'PHP',
		configurations: {
			'tedivm/jshrink': 'Token-based minification: removes whitespace and comments. It does not rename identifiers or perform structural compression, so its raw output is expected to be much larger than compressor-based tools.',
		},
		sources: [
			'packages/minifiers/minifiers/jshrink/index.ts',
			'https://github.com/tedious/JShrink',
		],
	},
];

type ConfigurationContext = {
	toolName: string;
	toolDescription: string;
	implementationLanguage: string;
	behavior: string;
};

const contextByConfiguration = new Map<string, ConfigurationContext>(
	tools.flatMap(tool => Object.entries(tool.configurations).map(([configuration, behavior]) => [
		configuration,
		{
			toolName: tool.toolName,
			toolDescription: tool.description,
			implementationLanguage: tool.implementationLanguage,
			behavior,
		},
	])),
);

export const getToolContext = (minifierName: string) => contextByConfiguration.get(minifierName);
