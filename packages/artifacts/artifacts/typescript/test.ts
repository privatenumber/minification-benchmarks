import assert from 'assert';
import { defineTest } from '../../utils/define-test.js';

export default defineTest<typeof import('typescript')>({
	run(ts) {
		const source = 'let x: () => string = () => "string"';
		const result = ts.transpileModule(source, {
			compilerOptions: {
				target: ts.ScriptTarget.ES3,
			},
		});

		assert.strictEqual(result.outputText, 'var x = function () { return "string"; };\n');
	},
});
