import assert from 'assert';
import type typescript from 'typescript';
import { defineTest } from '../..';

export default defineTest({
	run(ts: typeof typescript) {
		const source = "let x: () => string = () => 'string'";
		const result = ts.transpileModule(source, { compilerOptions: { target: ts.ScriptTarget.ES3 } });
		assert.strictEqual(result.outputText, "var x = function () { return 'string'; };\n");
	},
});
