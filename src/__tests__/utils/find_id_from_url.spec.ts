import { it, describe, expect } from 'vitest';
import { findIdFromUrl } from '../../utils/find_id_from_url';

describe('Find id from url', () => {
	describe('given the short url is http://localhost:3000/urls/t/L', () => {
		it('should extract the id from that url and return it', () => {
			const url = 'http://localhost:3000/urls/t/L';
			expect(findIdFromUrl(url)).toEqual('L');
		});
	});

	describe('given the short url is http://localhost:3000/urls/t/U', () => {
		it('should extract the id from that url and return it', () => {
			const url = 'http://localhost:3000/urls/t/U';
			expect(findIdFromUrl(url)).toEqual('U');
		});
	});
});
