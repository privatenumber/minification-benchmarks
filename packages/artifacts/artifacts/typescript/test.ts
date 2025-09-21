import assert from 'assert';
import type typescript from 'typescript';
import { defineTest } from '../../utils/define-test.js';

export default defineTest<typeof typescript>({
	run: (ts) => {
		const source = 'let x: () => string = () => "string"';
		const result = ts.transpileModule(source, {
			compilerOptions: {
				target: ts.ScriptTarget.ES3,

				// In browsers, TypeScript defaults to \r\n. We are running
				// TypeScript in Node.js, but we built TypeScript for the
				// browser so let's explicitly choose the desired newline
				// character.
				newLine: ts.NewLineKind.LineFeed,
			},
		});

		assert.strictEqual(result.outputText, 'var x = function () { return "string"; };\n');
	},
});
