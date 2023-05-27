import { generateShortUrlToken } from './generate_short_url_token';

export const generateShortUrl = (baseUrl: string, id: number) => {
	const token = generateShortUrlToken(id);

	return {
		token,
		shortUrl: `${baseUrl}/urls/t/${token}`,
	};
};
