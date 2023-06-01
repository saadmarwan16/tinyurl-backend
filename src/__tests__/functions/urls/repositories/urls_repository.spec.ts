import { expect, it, describe, vi, beforeEach, afterEach } from 'vitest';
import {
	IUrlsProvider,
	IUrlsRepository,
	UrlPairModel,
} from '../../../../functions/urls/interfaces';
import { iocContainer } from '../../../../ioc';
import { TYPES } from '../../../../types';

vi.mock('../../../../utils/generate_short_url', () => ({
	generateShortUrl: (baseUrl: string, id: number) => {
		if (id === 2) {
			return {
				token: '2',
				shortUrl: `${baseUrl}/urls/t/2`,
			};
		} else if (id === 0) {
			return {
				token: '0',
				shortUrl: `${baseUrl}/urls/t/0`,
			};
		}
	},
}));

vi.mock('../../../../utils/construct_base_url', () => ({
	constructBaseUrl: () => 'http://localhost:3000',
}));

vi.mock('../../../../utils/find_id_from_url', () => ({
	findIdFromUrl: (url: string) => {
		if (url === 'http://localhost:3000/urls/t/U') return 'U';
	},
}));

describe('Urls repository', () => {
	const host = 'localhost:3000';
	const baseUrl = 'http://localhost:3000';
	const urlsProviderStub = {
		getShortUrlId: vi.fn(),
		updateShortUrlId: vi.fn(),
		saveUrlPair: vi.fn(),
		getLongUrl: vi.fn(),
	};
	let urlsRepository: IUrlsRepository;

	beforeEach(() => {
		vi.clearAllMocks();
		iocContainer.snapshot();
		iocContainer
			.rebind<IUrlsProvider>(TYPES.UrlsProvider)
			.toConstantValue(urlsProviderStub);
		urlsRepository = iocContainer.get<IUrlsRepository>(TYPES.UrlsRepository);
	});

	afterEach(() => {
		iocContainer.restore();
	});

	describe('Generate short url', () => {
		describe('given getShortUrlId returns a value with token of 1', () => {
			it('should return 2', async () => {
				urlsProviderStub.getShortUrlId.mockResolvedValue({
					id: 'tokenKey',
					token: 1,
				});
				urlsProviderStub.updateShortUrlId.mockResolvedValue(undefined);
				urlsProviderStub.saveUrlPair.mockReturnValue(undefined);

				expect(await urlsRepository.generateShortUrl(host, 'dummy')).toEqual(
					`${baseUrl}/urls/t/2`
				);
				expect(urlsProviderStub.updateShortUrlId.mock.calls.length).toEqual(1);
				expect(urlsProviderStub.saveUrlPair.mock.calls.length).toEqual(1);
			});
		});

		describe('given getShortUrlId returns a value with token of undefined', () => {
			it('should return 0', async () => {
				urlsProviderStub.getShortUrlId.mockResolvedValue(undefined);
				urlsProviderStub.updateShortUrlId.mockResolvedValue(undefined);
				urlsProviderStub.saveUrlPair.mockReturnValue(undefined);

				expect(await urlsRepository.generateShortUrl(host, 'dummy')).toEqual(
					`${baseUrl}/urls/t/0`
				);
				expect(urlsProviderStub.updateShortUrlId.mock.calls.length).toEqual(1);
				expect(urlsProviderStub.saveUrlPair.mock.calls.length).toEqual(1);
			});
		});
	});

	describe('Get long url', () => {
		describe('given the get long url method returns a value that is not undefined', () => {
			it('should return the long url from the results', async () => {
				const results: UrlPairModel = {
					id: 'fake',
					shortUrl: 'https://short-url.com',
					longUrl: 'https://long-url.com',
				};
				urlsProviderStub.getLongUrl.mockResolvedValue(results);
				expect(
					await urlsRepository.getLongUrl('http://localhost:3000/urls/t/U')
				).toEqual(results.longUrl);
			});
		});

		describe('given the get long url method returns a value that is undefined', () => {
			it('should throw an error with a url not found error', async () => {
				urlsProviderStub.getLongUrl.mockResolvedValue(undefined);
				urlsRepository.getLongUrl('fake').catch((e) => {
					expect(e).toEqual(new Error('Long url not found'));
				});
			});
		});
	});
});
