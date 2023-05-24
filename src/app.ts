import express, { json, urlencoded, Request, Response } from 'express';
import { RegisterRoutes } from '../build/routes';
import { serve, generateHTML, JsonObject } from 'swagger-ui-express';
import docs from '../build/swagger.json';

export const app = express();

app.use(urlencoded({ extended: true }));
app.use(json());

app.use('/docs', serve, (_req: Request, res: Response) => {
	return res.send(
		generateHTML(docs as JsonObject, {
			customSiteTitle: 'Tinyurl Documentation',
		})
	);
});

RegisterRoutes(app);

app.use((_req: Request, res: Response) => {
	return res.status(404).send({ status: 'not found' });
});

app.use((_err: Error, _req: Request, res: Response) => {
	return res.status(500).json({
		message: 'Some really unexpected happened',
	});
});
