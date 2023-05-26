export interface IUrlsController {
	generateShortUrl(): Promise<Record<string, unknown> | undefined>;
}

export interface IUrlsRepository {
	generateShortUrl(baseUrl: string): Promise<string | undefined>;
}

export interface UrlModel {
	id: string;
	token: number;
}

export interface IUrlsProvider {
	getShortUrlId(): Promise<UrlModel | undefined>;
	updateShortUrlId(id: number): Promise<void>;
}
