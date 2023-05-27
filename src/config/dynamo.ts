import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';

import { NODE_ENV } from '../constants/secrets';

let dynamoClient: DynamoDBClient;
if (NODE_ENV === 'local' || NODE_ENV === 'test') {
	dynamoClient = new DynamoDBClient({
		region: 'local',
		endpoint: 'http://localhost:8000',
	});
} else {
	dynamoClient = new DynamoDBClient({});
}

export { dynamoClient };

export const dynamoDocClient = DynamoDBDocumentClient.from(dynamoClient, {
	marshallOptions: {
		convertEmptyValues: false,
		removeUndefinedValues: true,
		convertClassInstanceToMap: false,
	},
	unmarshallOptions: {
		wrapNumbers: false,
	},
});
