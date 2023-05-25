import { describe, expect, it } from 'vitest';
import { generateShortUrlToken } from '../../utils/generate_short_url_token';

describe('given the token is a negative number', () => {
	it('should return A', () => {
		expect(() => generateShortUrlToken(-10)).toThrow(
			'Token cannot be negative'
		);
	});
});

describe('given the token is 0', () => {
	it('should return A', () => {
		expect(generateShortUrlToken(0)).toEqual('A');
	});
});

describe('given the token is 1', () => {
	it('should return B', () => {
		expect(generateShortUrlToken(1)).toEqual('B');
	});
});

describe('given the token is 5968', () => {
	it('should return BiQ', () => {
		expect(generateShortUrlToken(5968)).toEqual('BiQ');
	});
});

describe('given the token is 13660', () => {
	it('should return DiU', () => {
		expect(generateShortUrlToken(13660)).toEqual('DiU');
	});
});

describe('given the token is 99999', () => {
	it('should return aA3', () => {
		expect(generateShortUrlToken(99999)).toEqual('aA3');
	});
});
