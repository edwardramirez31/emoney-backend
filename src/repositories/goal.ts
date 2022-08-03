import * as dynamoose from 'dynamoose';
import { Model } from 'dynamoose/dist/Model';
import { SavingGoal, SavingGoalSchema } from 'src/models/goal';

export interface SavingGoalRequest {
  id: string;
  goal: string;
  location: string;
  amount: number;
  tenantId: string;
  icon?: string;
  color?: string;
  image?: string;
}

export default class SavingGoalRepository {
  private dbInstance: Model<SavingGoal>;

  constructor() {
    this.dbInstance = dynamoose.model<SavingGoal>('SavingGoal', SavingGoalSchema, { create: false });
  }
  create = async (request: SavingGoalRequest): Promise<SavingGoal> => {
    return await this.dbInstance.create({
      id: request.id,
      goal: request.goal,
      location: request.location,
      amount: request.amount,
      icon: request.icon,
      color: request.color,
      image: request.image,
      tenantId: request.tenantId
    });
  };

  update = async (request: SavingGoalRequest): Promise<SavingGoal> => {
    return await this.dbInstance.update({
      id: request.id,
      tenantId: request.tenantId,
      goal: request.goal,
      location: request.location,
      amount: request.amount,
      icon: request.icon,
      color: request.color,
      image: request.image
    });
  };

  getById = async (id: string, tenantId: string): Promise<SavingGoal> => {
    return await this.dbInstance.get({ id, tenantId });
  };

  getByTenantId = async (tenantId: string): Promise<SavingGoal[]> => {
    return await this.dbInstance.scan().filter('tenantId').eq(tenantId).exec();
  };

  deleteById = async (id: string, tenantId: string): Promise<void> => {
    const account = await this.dbInstance.get({ id, tenantId });

    return await account.delete();
  };
}
