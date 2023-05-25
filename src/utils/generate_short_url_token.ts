import { base62 } from '../constants/base62';

export const generateShortUrlToken = (token: number) => {
	let dividend = Math.floor(token);
	if (dividend < 0) throw Error('Token cannot be negative');

	const reversed = [];
	while (dividend > 0) {
		reversed.push(dividend % 62);
		dividend = Math.floor(dividend / 62);
	}

	const results = [];
	for (let i = 0; i < reversed.length; i++) {
		const idx = reversed.length - i - 1;
		results.push(base62[reversed[idx]]);
	}

	return results.length === 0 ? 'A' : ''.concat(...results);
};
