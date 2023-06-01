import { describe, expect, it, beforeEach } from 'vitest';
import { supertest } from '../../../config/supertest';
import { createProductsTableIfDoesNotExist } from '../../../../utils/create_products_table_if_does_not_exist';
import { dynamoClient } from '../../../../config/dynamo';

describe('Urls controller', () => {
	beforeEach(async () => {
		await createProductsTableIfDoesNotExist(dynamoClient);
	});

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

	describe('GET /urls/:id', () => {
		describe('given the short url provided is valid', () => {
			it('should return the long url', async () => {
				const longUrl = 'https://stackoverflow.com';
				const {
					body: { url },
				} = await supertest
					.post('/urls')
					.send({
						longUrl,
					})
					.expect(201);
				const { body } = await supertest
					.get('/urls')
					.query({
						shortUrl: url,
					})
					.expect(200);

				expect(body).toEqual({ url: longUrl });
			});
		});
	});
});
