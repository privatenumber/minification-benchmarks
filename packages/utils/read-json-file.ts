import fs from 'fs/promises';

export const readJsonFile = async (
	filePath: string
) => {
	const jsonString = await fs.readFile(filePath, 'utf8');
	return JSON.parse(jsonString) as unknown;
};
