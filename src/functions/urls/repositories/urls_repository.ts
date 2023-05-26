import { inject, injectable } from 'inversify';
import { IUrlsProvider, IUrlsRepository } from '../interfaces';
import { TYPES } from '../../../types';

@injectable()
export class UrlsRepository implements IUrlsRepository {
	constructor(
		@inject(TYPES.UrlsProvider) private _urlsProvider: IUrlsProvider
	) {}

	async generateShortUrl(): Promise<Record<string, unknown> | undefined> {
		return await this._urlsProvider.getShortUrlId();
	}
}
