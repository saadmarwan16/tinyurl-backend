import { Controller, Get, Path, Route } from 'tsoa';
import { config } from 'dotenv';

config();

@Route('/urls')
export class UrlsController extends Controller {
	@Get()
	public getAllUrls() {
		return {
			message: `Hello, world from STAGE ${process.env.STAGE as string}`,
		};
	}

	@Get('/{id}')
	public getSingleUrl(@Path('id') id: string) {
		return {
			message: `Hello, world from STAGE ${
				process.env.STAGE as string
			} with id of ${id}`,
		};
	}
}
