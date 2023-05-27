import { it, describe, expect } from 'vitest';
import { constructBaseUrl } from '../../utils/construct_base_url';

describe('Construct base url', () => {
	describe('given the node environment is test', () => {
		it('should return the base url with the http protocol', () => {
			expect(constructBaseUrl('localhost:3000')).toEqual(
				'http://localhost:3000'
			);
		});
	});
});
