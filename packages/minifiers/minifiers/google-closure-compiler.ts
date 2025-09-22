import Compiler from 'google-closure-compiler';
import { createMinifier } from '../utils/create-minifier.js';

export default createMinifier(
	'google-closure-compiler',
	{
		default: async ({ filePath }) => {
			const compiler = new Compiler({
				js: filePath,

				// Closure Library / deps handling off
				dependency_mode: 'NONE',

				// Ignore @export-related passes
				generate_exports: false,
				export_local_property_definitions: false,

				// Keep it to pure minification
				rewrite_polyfills: false,
				apply_input_source_maps: false,
				parse_inline_source_maps: false,
				language_in: 'ECMASCRIPT_NEXT',
				language_out: 'ECMASCRIPT_NEXT',
				assume_function_wrapper: true,
				emit_use_strict: false,
				compilation_level: 'SIMPLE',
			});

			const code = await new Promise((resolve, reject) => {
				compiler.run((exitCode, stdOut, stdError) => {
					if (exitCode > 0) {
						reject(stdError);
						return;
					}
					resolve(stdOut);
				});
			});

			return code as string;
		},
	},
);
