import { GetCommand, PutCommand } from '@aws-sdk/lib-dynamodb';
import { IUrlsProvider, UrlModel } from '../interfaces';
import { dynamoClient } from '../../../config/dynamo';
import { injectable } from 'inversify';

@injectable()
export class UrlsProvider implements IUrlsProvider {
	public tableName = 'urls-db-local';
	public primaryKey = 'tokenKey';

	async getShortUrlId(): Promise<UrlModel | undefined> {
		const command = new GetCommand({
			TableName: this.tableName,
			Key: {
				id: this.primaryKey,
			},
		});
		const results = await dynamoClient.send(command);

		return results.Item as UrlModel | undefined;
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
