import * as dynamoose from 'dynamoose';
import { Model } from 'dynamoose/dist/Model';
import { Schema } from 'dynamoose/dist/Schema';
import { Document } from 'dynamoose/dist/Document';

export default class CRUDRepository<T extends Document> {
  protected dbInstance: Model<T>;

  constructor(tableName: string, schema: Schema) {
    this.dbInstance = dynamoose.model<T>(tableName, schema, { create: false });
  }

  create = async (request: Partial<T>): Promise<T> => {
    const newItem = await this.dbInstance.create({
      ...request
    });

    return newItem;
  };

  update = async (request: Partial<T>, objectKey: { id: string; tenantId?: string }): Promise<T> => {
    const tenancyCondition = objectKey.tenantId ? new dynamoose.Condition().where('tenantId').eq(objectKey.tenantId) : undefined;

    try {
      return await this.dbInstance.update(
        {
          ...objectKey
        },
        {
          ...request
        },
        { condition: tenancyCondition }
      );
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(JSON.stringify(error));
      if (error.code === 'ConditionalCheckFailedException') {
        throw { response: { status: 404, body: { errorMessage: 'account not found' } } };
      }
      throw { response: { status: 400, body: { errorMessage: 'something went wrong' } } };
    }
  };

  getById = async (id: string, tenantId: string): Promise<T> => {
    return await this.dbInstance.get({ id, tenantId });
  };

  getByTenantId = async (tenantId: string): Promise<T[]> => {
    return await this.dbInstance.scan().filter('tenantId').eq(tenantId).exec();
  };

  deleteById = async (id: string, tenantId: string): Promise<void> => {
    const account = await this.dbInstance.get({ id, tenantId });
    if (account) {
      return await account.delete();
    } else {
      throw { response: { status: 404, body: { errorMessage: 'account not found' } } };
    }
  };
}
