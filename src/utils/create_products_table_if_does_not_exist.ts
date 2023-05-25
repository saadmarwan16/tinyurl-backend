import {
	CreateTableCommand,
	DescribeTableCommand,
	DynamoDBClient,
	ResourceNotFoundException,
} from '@aws-sdk/client-dynamodb';

export const createProductsTableIfDoesNotExist = async (
	client: DynamoDBClient
) => {
	try {
		await client.send(
			new DescribeTableCommand({
				TableName: 'urls-db-local',
			})
		);
	} catch (e) {
		if (!(e instanceof ResourceNotFoundException)) {
			throw e;
		}

		await client.send(
			new CreateTableCommand({
				TableName: 'urls-db-local',
				AttributeDefinitions: [
					{
						AttributeName: 'id',
						AttributeType: 'S',
					},
				],
				KeySchema: [
					{
						AttributeName: 'id',
						KeyType: 'HASH',
					},
				],
				ProvisionedThroughput: {
					ReadCapacityUnits: 5,
					WriteCapacityUnits: 5,
				},
			})
		);
	}
};
