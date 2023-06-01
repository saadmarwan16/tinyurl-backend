import {
	Controller,
	Get,
	Post,
	Route,
	SuccessResponse,
	Request,
	Body,
	Query,
} from 'tsoa';
import { inject, injectable } from 'inversify';
import { TYPES } from '../../../types';
import {
	IUrlsController,
	IUrlsRepository,
	ShortUrlCreationModel,
} from '../interfaces';
import { Request as ExpRequest } from 'express';

@injectable()
@Route('/urls')
export class UrlsController extends Controller implements IUrlsController {
	constructor(
		@inject(TYPES.UrlsRepository) private _urlsRepository: IUrlsRepository
	) {
		super();
	}

	@SuccessResponse('201', 'Created')
	@Post('/')
	public async generateShortUrl(
		@Request() req: ExpRequest,
		@Body() body: ShortUrlCreationModel
	): Promise<{ url: string }> {
		const url = await this._urlsRepository.generateShortUrl(
			req.headers.host ?? 'http://localhost:3000',
			body.longUrl
		);

		return {
			url,
		};
	}

	// @Get()
	// public getAllUrls() {
	// 	return {
	// 		message: `Hello, world from STAGE ${process.env.STAGE as string}`,
	// 	};
	// }

	@Get()
	async getSingleUrl(@Query() shortUrl: string) {
		try {
			const results = await this._urlsRepository.getLongUrl(shortUrl);

			return {
				url: results,
			};
		} catch (e) {
			this.setStatus(404);

			return {
				message: 'The provided short url has no corresponding long url',
			};
		}
	}
}
