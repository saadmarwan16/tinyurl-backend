import { describe, expect, it } from 'vitest';
import { supertest } from '../../../config/supertest';

describe('Urls controller', () => {
	describe('POST /urls', () => {
		describe('given the request is properly formed', async () => {
			it('should return a short url with status code of 201', async () => {
				const { body } = await supertest
					.post('/urls')
					.send({
						longUrl: 'https://google.com',
					})
					.expect(201);

				expect(body).toEqual({ url: expect.anything() });
			});
		});
	});
});
