const preservedComment = /\/\*!/g;
const legalComment = /\* @license/g;

export const unpreserveComments = (
	code: string,
) => {
	let strippedCode = code;

	if (preservedComment.test(strippedCode)) {
		strippedCode = strippedCode.replaceAll(preservedComment, '/*');
	}

	if (legalComment.test(strippedCode)) {
		strippedCode = strippedCode.replaceAll(legalComment, '*');
	}

	return strippedCode;
};
