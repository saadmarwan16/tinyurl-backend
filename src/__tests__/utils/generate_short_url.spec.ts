import { expect, it, describe } from 'vitest';
import { generateShortUrl } from '../../utils/generate_short_url';

describe('given the base url is htpp://localhost:3000 and value is 0', () => {
	it('should return htpp://localhost:3000/urls/t/A', async () => {
		expect(generateShortUrl('htpp://localhost:3000', 0)).toEqual(
			'htpp://localhost:3000/urls/t/A'
		);
	});
});

describe('given the base url is htpp://localhost:3000 and value is 1', () => {
	it('should return htpp://localhost:3000/urls/t/B', async () => {
		expect(generateShortUrl('htpp://localhost:3000', 1)).toEqual(
			'htpp://localhost:3000/urls/t/B'
		);
	});
});

describe('given the base url is htpp://localhost:3000 and value is 99999', () => {
	it('should return htpp://localhost:3000/urls/t/aA3', async () => {
		expect(generateShortUrl('htpp://localhost:3000', 99999)).toEqual(
			'htpp://localhost:3000/urls/t/aA3'
		);
	});
});
