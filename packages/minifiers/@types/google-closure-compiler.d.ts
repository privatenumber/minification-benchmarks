declare module 'google-closure-compiler' {
	export interface CompilerOptions {
		js?: string | string[];
		externs?: string | string[];

		compilation_level?: 'WHITESPACE_ONLY' | 'SIMPLE' | 'ADVANCED' | 'BUNDLE';
		warning_level?: 'QUIET' | 'DEFAULT' | 'VERBOSE';
		language_in?:
		| 'ECMASCRIPT3'
		| 'ECMASCRIPT5'
		| 'ECMASCRIPT_2015'
		| 'ECMASCRIPT_2016'
		| 'ECMASCRIPT_2017'
		| 'ECMASCRIPT_2018'
		| 'ECMASCRIPT_2019'
		| 'ECMASCRIPT_2020'
		| 'ECMASCRIPT_2021'
		| 'STABLE'
		| 'ECMASCRIPT_NEXT';
		language_out?:
		| 'ECMASCRIPT3'
		| 'ECMASCRIPT5'
		| 'ECMASCRIPT_2015'
		| 'ECMASCRIPT_2016'
		| 'ECMASCRIPT_2017'
		| 'ECMASCRIPT_2018'
		| 'ECMASCRIPT_2019'
		| 'ECMASCRIPT_2020'
		| 'ECMASCRIPT_2021'
		| 'STABLE'
		| 'ECMASCRIPT_NEXT';

		dependency_mode?: 'NONE' | 'LOOSE' | 'STRICT';

		generate_exports?: boolean;
		export_local_property_definitions?: boolean;

		rewrite_polyfills?: boolean;
		apply_input_source_maps?: boolean;
		parse_inline_source_maps?: boolean;

		// Output shaping
		assume_function_wrapper?: boolean;
		emit_use_strict?: boolean;

		// Misc common flags you may want
		define?: string | string[]; // e.g. 'goog.DEBUG=false'
		js_output_file?: string; // if you want CC to write a file
		create_source_map?: string; // path or %outname%.map
		source_map_location_mapping?: string[]; // ['src|.', ...]
	}

	class Compiler {
		constructor(options?: CompilerOptions);
		run(
			callback: (exitCode: number, stdOut: string, stdErr: string) => void
		): void;
	}

	export default Compiler;
}
