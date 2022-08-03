import * as dynamoose from 'dynamoose';
import { Model } from 'dynamoose/dist/Model';
import { TransferSchema, Transfer } from 'src/models/transfer';

export interface TransferRequest {
  id: string;
  comment?: string;
  sender: string;
  receiver: string;
  date: number;
  amount: number;
  tenantId: string;
}

export default class TransferRepository {
  private dbInstance: Model<Transfer>;

  constructor() {
    this.dbInstance = dynamoose.model<Transfer>('Transfer', TransferSchema, { create: false });
  }
  create = async (request: TransferRequest): Promise<Transfer> => {
    return await this.dbInstance.create({
      id: request.id,
      comment: request.comment,
      date: request.date,
      sender: request.sender,
      receiver: request.receiver,
      amount: request.amount,
      tenantId: request.tenantId
    });
  };

  update = async (request: TransferRequest): Promise<Transfer> => {
    return await this.dbInstance.update({
      id: request.id,
      tenantId: request.tenantId,
      comment: request.comment,
      date: request.date,
      sender: request.sender,
      receiver: request.receiver,
      amount: request.amount
    });
  };

  getById = async (id: string, tenantId: string): Promise<Transfer> => {
    return await this.dbInstance.get({ id, tenantId });
  };

  getByTenantId = async (tenantId: string): Promise<Transfer[]> => {
    return await this.dbInstance.scan().filter('tenantId').eq(tenantId).exec();
  };

  deleteById = async (id: string, tenantId: string): Promise<void> => {
    const account = await this.dbInstance.get({ id, tenantId });

    return await account.delete();
  };
}
