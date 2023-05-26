import { expect, it, describe, vi } from 'vitest';
import { generateShortUrl } from '../../utils/generate_short_url';

vi.mock('../../utils/generate_short_url_token', () => ({
	generateShortUrlToken: () => 'dummy',
}));

describe('Generate short url', () => {
	describe('given the base url is htpp://localhost:3000', () => {
		it('should return htpp://localhost:3000/urls/t/dummy', () => {
			expect(generateShortUrl('htpp://localhost:3000', 0)).toEqual(
				'htpp://localhost:3000/urls/t/dummy'
			);
		});
	});
});
