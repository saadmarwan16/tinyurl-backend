import { expect, it, vi } from 'vitest';
import {
	IUrlsProvider,
	IUrlsRepository,
} from '../../../../functions/urls/interfaces';
import { iocContainer } from '../../../../ioc';
import { TYPES } from '../../../../types';

const urlIdSnapshot = {
	id: 'tokenKey',
	token: 0,
};

// vi.mock('../../../../functions/urls/providers/urls_provider', () => ({
// 	UrlsProvider: {
// 		getShortUrlId: () => urlIdSnapshot,
// 	},
// }));

it('should return 69', async () => {
	const urlsProvider = {
		getShortUrlId: vi.fn(),
		updateShortUrlId: vi.fn(),
	};
	iocContainer
		.rebind<IUrlsProvider>(TYPES.UrlsProvider)
		.toConstantValue(urlsProvider);
	const urlsRepository = iocContainer.get<IUrlsRepository>(
		TYPES.UrlsRepository
	);
	urlsProvider.getShortUrlId.mockResolvedValue(urlIdSnapshot);

	expect(await urlsRepository.generateShortUrl()).toEqual(urlIdSnapshot);
});
