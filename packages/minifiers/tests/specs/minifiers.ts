import { expect, test } from 'manten';
import { getMinifier } from '../../index.ts';
import { runMinifier } from '../../utils/run-minifier.ts';

test('accepts stderr on success', async () => {
	const output = await runMinifier(process.execPath, ['-e', 'process.stderr.write("warning"); process.stdout.write("ok")']);
	expect(output).toBe('ok');
});

test('reports nonzero exits with stderr', async () => {
	const error = await runMinifier(process.execPath, ['-e', 'process.stdin.pipe(process.stderr); process.stdin.on("end", () => process.exit(1))'], {
		input: '1 | <?php\nerror: Unexpected token\n',
	}).catch(error_ => error_ as Error);
	expect(error).toBeInstanceOf(Error);
	expect((error as Error).message).toMatch(/^1 \| <\?php\nerror: Unexpected token\nCommand failed with exit code 1:/);
});

test('rejects nonzero exits without stderr', async () => {
	await expect(runMinifier(process.execPath, ['-e', 'process.exit(7)'])).rejects.toThrow('exit code 7');
});

test('reports spawn errors', async () => {
	await expect(runMinifier('/nonexistent/minifier', [])).rejects.toThrow('Command failed');
});

// Composer-backed minifiers are not covered here: CI runs tests without `composer install`
test('loads local metadata without fetch', async () => {
	const originalFetch = globalThis.fetch;
	globalThis.fetch = () => {
		throw new Error('unexpected fetch');
	};
	try {
		const esbuild = await getMinifier('esbuild');
		expect(esbuild.meta.name).toBe('esbuild');
	} finally {
		globalThis.fetch = originalFetch;
	}
});
