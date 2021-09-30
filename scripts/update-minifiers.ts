import path from 'path';
import { exec } from 'child_process';
import { promisify } from 'util';
import checkUpdates from 'npm-check-updates';
import task from 'tasuku';
import { getMinifiers } from '../lib/utils/get-minifiers';
import packageJSON from '../package.json';

task('Update minifiers to lastest', async () => {
	const minifiers = (
		(await getMinifiers())
			.map(minifier => minifier.replace(/\..*/, ''))
			.filter((value, index, array) => array.indexOf(value) === index)
	);
	const minifierPackages = (
		minifiers
			.map(minifier => (
				Object.keys(packageJSON.dependencies)
					.find(value => value.includes(minifier))
			))
	);

	await checkUpdates.run({
		packageFile: `${path.dirname(__filename)}/../package.json`,
		upgrade: true,
		filter: minifierPackages,
	});

	await promisify(exec)('npx pnpm install --frozen-lockfile=false');
});
