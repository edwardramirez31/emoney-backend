import * as dynamoose from 'dynamoose';
import { Model } from 'dynamoose/dist/Model';
import { Category, CategoryType, CategorySchema } from 'src/models/category';

export interface CategoryRequest {
  id: string;
  name: string;
  type: CategoryType;
  icon: string;
  color: string;
  budget: number;
  tenantId: string;
}

export default class CategoryRepository {
  private dbInstance: Model<Category>;

  constructor() {
    this.dbInstance = dynamoose.model<Category>('Category', CategorySchema, { create: false });
  }
  create = async (request: CategoryRequest): Promise<Category> => {
    return await this.dbInstance.create({
      id: request.id,
      name: request.name,
      type: request.type,
      icon: request.icon,
      color: request.color,
      budget: request.budget,
      tenantId: request.tenantId
    });
  };

  update = async (request: CategoryRequest): Promise<Category> => {
    return await this.dbInstance.update({
      id: request.id,
      tenantId: request.tenantId,
      name: request.name,
      type: request.type,
      icon: request.icon,
      color: request.color,
      budget: request.budget
    });
  };

  getById = async (id: string, tenantId: string): Promise<Category> => {
    return await this.dbInstance.get({ id, tenantId });
  };

  getByTenantId = async (tenantId: string): Promise<Category[]> => {
    return await this.dbInstance.scan().filter('tenantId').eq(tenantId).exec();
  };

  deleteById = async (id: string, tenantId: string): Promise<void> => {
    const account = await this.dbInstance.get({ id, tenantId });

    return await account.delete();
  };
}
