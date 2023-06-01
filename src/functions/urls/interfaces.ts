import { Request } from 'express';

export interface IUrlsController {
	generateShortUrl(
		req: Request,
		longUrl: ShortUrlCreationModel
	): Promise<{ url: string }>;
}

export interface IUrlsRepository {
	generateShortUrl(host: string, longUrl: string): Promise<string>;
	getLongUrl(shortUrl: string): Promise<string>;
}

export interface UrlModel {
	id: string;
	token: number;
}

export interface ShortUrlCreationModel {
	longUrl: string;
}

export interface UrlPairModel {
	id: string;
	shortUrl: string;
	longUrl: string;
}

export interface IUrlsProvider {
	getShortUrlId(): Promise<UrlModel | undefined>;
	updateShortUrlId(id: number): Promise<void>;
	saveUrlPair(item: UrlPairModel): Promise<void>;
	getLongUrl(id: string): Promise<UrlPairModel | undefined>;
}
