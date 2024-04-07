import fs from 'fs/promises';

const preservedComment = /\/\*!/g;
const legalComment = /\* @license/g;

export const unpreserveComments = async (
	code: string,
	filePath: string,
) => {
	let strippedCode = code;

	if (preservedComment.test(strippedCode)) {
		strippedCode = strippedCode.replaceAll(preservedComment, '/*');
	}

	if (legalComment.test(strippedCode)) {
		strippedCode = strippedCode.replaceAll(legalComment, '*');
	}

	if (code !== strippedCode) {
		// For minifiers like Google Closure that read from path
		await fs.writeFile(filePath, strippedCode);
	}

	return strippedCode;
};
