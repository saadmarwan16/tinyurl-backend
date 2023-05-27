import { expect, it, describe, vi, beforeEach, afterEach } from 'vitest';
import {
	IUrlsProvider,
	IUrlsRepository,
} from '../../../../functions/urls/interfaces';
import { iocContainer } from '../../../../ioc';
import { TYPES } from '../../../../types';
import { constructBaseUrl } from '../../../../utils/construct_base_url';

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

describe('Urls repository', () => {
	const host = 'localhost:3000';
	const baseUrl = 'http://localhost:3000';
	const urlsProviderStub = {
		getShortUrlId: vi.fn(),
		updateShortUrlId: vi.fn(),
		saveUrlPair: vi.fn(),
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
