import { Controller, Get, Path, Route } from 'tsoa';

@Route('/urls')
export class UrlsController extends Controller {
	@Get()
	public getAllUrls() {
		return {
			message: 'Hello, world',
		};
	}

	@Get('/{id}')
	public getSingleUrl(@Path('id') id: string) {
		return {
			message: `Hello, world with id of ${id}`,
		};
	}
}
