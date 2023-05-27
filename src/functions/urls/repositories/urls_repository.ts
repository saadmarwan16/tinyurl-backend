import { inject, injectable } from 'inversify';
import { IUrlsProvider, IUrlsRepository } from '../interfaces';
import { TYPES } from '../../../types';
import { generateShortUrl } from '../../../utils/generate_short_url';
import { constructBaseUrl } from '../../../utils/construct_base_url';

@injectable()
export class UrlsRepository implements IUrlsRepository {
	constructor(
		@inject(TYPES.UrlsProvider) private _urlsProvider: IUrlsProvider
	) {}

	async generateShortUrl(host: string, longUrl: string): Promise<string> {
		const url = await this._urlsProvider.getShortUrlId();
		const id = url ? url.token + 1 : 0;
		const baseUrl = constructBaseUrl(host);
		const { token, shortUrl } = generateShortUrl(baseUrl, id);
		await this._urlsProvider.updateShortUrlId(id);
		await this._urlsProvider.saveUrlPair({
			id: token,
			shortUrl,
			longUrl,
		});

		return shortUrl;
	}
}
