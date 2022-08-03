import * as dynamoose from 'dynamoose';
import { Model } from 'dynamoose/dist/Model';
import { Account, AccountSchema } from 'src/models/account';

export interface AccountRequest {
  id: string;
  tenantId: string;
  name: string;
  icon: string;
  color: string;
  cleared?: number;
  balance?: number;
  goal?: number;
}

export default class AccountRepository {
  private dbInstance: Model<Account>;

  constructor() {
    this.dbInstance = dynamoose.model<Account>('Account', AccountSchema, { create: false });
  }

  create = async (request: AccountRequest): Promise<Account> => {
    return await this.dbInstance.create({
      id: request.id,
      tenantId: request.tenantId,
      name: request.name,
      cleared: request.cleared,
      balance: request.balance,
      goal: request.goal,
      icon: request.icon,
      color: request.color
    });
  };

  update = async (request: AccountRequest): Promise<Account> => {
    const condition = new dynamoose.Condition().where('tenantId').eq(request.tenantId);
    try {
      return await this.dbInstance.update(
        {
          id: request.id,
          tenantId: request.tenantId
        },
        {
          name: request.name,
          cleared: request.cleared,
          balance: request.balance,
          goal: request.goal,
          icon: request.icon,
          color: request.color
        },
        { condition: condition }
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

  getById = async (id: string, tenantId: string): Promise<Account | undefined> => {
    return await this.dbInstance.get({ id, tenantId });
  };

  getByTenantId = async (tenantId: string): Promise<Account[]> => {
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
