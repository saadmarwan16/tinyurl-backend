export interface IUrlsController {
	generateShortUrl(): Promise<Record<string, unknown> | undefined>;
}

export interface IUrlsRepository {
	generateShortUrl(): Promise<Record<string, unknown> | undefined>;
}

export interface IUrlsProvider {
	getShortUrlId(): Promise<Record<string, unknown> | undefined>;
	updateShortUrlId(id: number): Promise<void>;
}
