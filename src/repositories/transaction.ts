import * as dynamoose from 'dynamoose';
import { Model } from 'dynamoose/dist/Model';
import { CategoryType } from 'src/models/category';
import { TransactionSchema, Transaction } from 'src/models/transaction';

export interface TransactionRequest {
  id: string;
  accountId: string;
  comment?: string;
  date: string;
  tag?: string;
  categoryId: string;
  type: CategoryType;
  cleared: boolean;
  amount: number;
  tenantId: string;
}

export default class TransactionRepository {
  private dbInstance: Model<Transaction>;

  constructor() {
    this.dbInstance = dynamoose.model<Transaction>('Transaction', TransactionSchema, { create: false });
  }
  create = async (request: TransactionRequest): Promise<Transaction> => {
    return await this.dbInstance.create({
      id: request.id,
      accountId: request.accountId,
      comment: request.comment,
      date: request.date,
      tag: request.tag,
      categoryId: request.categoryId,
      type: request.type,
      cleared: request.cleared,
      amount: request.amount,
      tenantId: request.tenantId
    });
  };

  update = async (request: TransactionRequest): Promise<Transaction> => {
    return await this.dbInstance.update({
      id: request.id,
      tenantId: request.tenantId,
      accountId: request.accountId,
      comment: request.comment,
      date: request.date,
      tag: request.tag,
      categoryId: request.categoryId,
      type: request.type,
      cleared: request.cleared,
      amount: request.amount
    });
  };

  getById = async (id: string, tenantId: string): Promise<Transaction> => {
    return await this.dbInstance.get({ id, tenantId });
  };

  getByTenantId = async (tenantId: string): Promise<Transaction[]> => {
    return await this.dbInstance.scan().filter('tenantId').eq(tenantId).exec();
  };

  deleteById = async (id: string, tenantId: string): Promise<void> => {
    const account = await this.dbInstance.get({ id, tenantId });

    return await account.delete();
  };
}
