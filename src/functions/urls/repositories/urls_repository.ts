import { inject, injectable } from 'inversify';
import { IUrlsProvider, IUrlsRepository } from '../interfaces';
import { TYPES } from '../../../types';
import { generateShortUrl } from '../../../utils/generate_short_url';

@injectable()
export class UrlsRepository implements IUrlsRepository {
	constructor(
		@inject(TYPES.UrlsProvider) private _urlsProvider: IUrlsProvider
	) {}

	async generateShortUrl(baseUrl: string): Promise<string | undefined> {
		const url = await this._urlsProvider.getShortUrlId();
		const id = url ? url.token + 1 : 0;
		const token = generateShortUrl(baseUrl, id);
		await this._urlsProvider.updateShortUrlId(id);

		return token;
	}
}
