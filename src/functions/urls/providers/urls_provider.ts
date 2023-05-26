import { GetCommand, PutCommand } from '@aws-sdk/lib-dynamodb';
import { IUrlsProvider } from '../interfaces';
import { dynamoClient } from '../../../config/dynamo';
import { injectable } from 'inversify';

@injectable()
export class UrlsProvider implements IUrlsProvider {
	public tableName = 'urls-db-local';
	public primaryKey = 'tokenKey';

	async getShortUrlId(): Promise<Record<string, unknown> | undefined> {
		const command = new GetCommand({
			TableName: this.tableName,
			Key: {
				id: this.primaryKey,
			},
		});
		const results = await dynamoClient.send(command);

		return results.Item;
	}

	async updateShortUrlId(id: number): Promise<void> {
		const command = new PutCommand({
			TableName: this.tableName,
			Item: {
				id: this.primaryKey,
				token: id,
			},
		});

		await dynamoClient.send(command);
	}
}
