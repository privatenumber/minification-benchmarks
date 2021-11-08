import fs from 'fs/promises';

const preservedComment = /\/\*!/g;
const legalComment = /\* @license/g;

export async function unpreserveComment(
	code: string,
	filePath: string,
) {
	let strippedCode = code;

	if (preservedComment.test(strippedCode)) {
		strippedCode = strippedCode.replace(preservedComment, '/*');
	}

	if (legalComment.test(strippedCode)) {
		strippedCode = strippedCode.replace(legalComment, '*');
	}

	if (code !== strippedCode) {
		// For minifiers like Google Closure that read from path
		await fs.writeFile(filePath, strippedCode);
	}

	return strippedCode;
}
