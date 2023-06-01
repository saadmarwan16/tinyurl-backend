export const findIdFromUrl = (url: string) => {
	const results = url.split('/');

	return results[results.length - 1];
};
