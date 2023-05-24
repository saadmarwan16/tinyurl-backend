import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { app } from './app';
import { createProductsTableIfDoesNotExist } from './utils/createProductsTableIfDoesNotExist';

// eslint-disable-next-line @typescript-eslint/no-misused-promises
setImmediate(async () => {
	await createProductsTableIfDoesNotExist(
		new DynamoDBClient({
			endpoint: 'http://localhost:8000',
			region: 'local',
		})
	);
});

const PORT = 3000;

app.listen(PORT, () => {
	console.log(`Server running at http://localhost:${PORT}`);
});
