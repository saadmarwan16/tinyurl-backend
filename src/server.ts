import { app } from './app';
import { dynamoClient } from './config/dynamo';
import { createProductsTableIfDoesNotExist } from './utils/create_products_table_if_does_not_exist';

const PORT = 3000;

const start = async () => {
	await createProductsTableIfDoesNotExist(dynamoClient);

	app.listen(PORT, () => {
		console.log(`Server running at http://localhost:${PORT}`);
	});
};

void start();
