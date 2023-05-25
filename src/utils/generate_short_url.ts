import { generateShortUrlToken } from './generate_short_url_token';

export const generateShortUrl = (baseUrl: string, val: number) => {
	return `${baseUrl}/urls/t/${generateShortUrlToken(val)}`;
};
