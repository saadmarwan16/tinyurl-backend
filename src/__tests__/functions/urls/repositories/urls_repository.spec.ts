import { expect, it, describe, vi, beforeEach, afterEach } from 'vitest';
import {
	IUrlsProvider,
	IUrlsRepository,
} from '../../../../functions/urls/interfaces';
import { iocContainer } from '../../../../ioc';
import { TYPES } from '../../../../types';

vi.mock('../../../../utils/generate_short_url', () => ({
	generateShortUrl: (baseUrl: string, id: number) => {
		if (id === 2) {
			return `${baseUrl}/urls/t/2`;
		} else if (id === 0) {
			return `${baseUrl}/urls/t/0`;
		}
	},
}));

describe('Urls repository', () => {
	const baseUrl = 'http://localhost:3000';
	const urlsProviderStub = {
		getShortUrlId: vi.fn(),
		updateShortUrlId: vi.fn(),
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
			const mock =
				urlsProviderStub.updateShortUrlId.mockResolvedValue(undefined);

			expect(await urlsRepository.generateShortUrl(baseUrl)).toEqual(
				`${baseUrl}/urls/t/2`
			);
			expect(mock.mock.calls.length).toEqual(1);
		});
	});

	describe('given getShortUrlId returns a value with token of undefined', () => {
		it('should return 0', async () => {
			urlsProviderStub.getShortUrlId.mockResolvedValue(undefined);
			const mock =
				urlsProviderStub.updateShortUrlId.mockResolvedValue(undefined);

			expect(await urlsRepository.generateShortUrl(baseUrl)).toEqual(
				`${baseUrl}/urls/t/0`
			);
			expect(mock.mock.calls.length).toEqual(1);
		});
	});
});
