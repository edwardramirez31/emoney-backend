import { Category, CategoryType, CategorySchema } from 'src/models/category';

import CRUDRepository from '.';

export interface CategoryRequest {
  id: string;
  name: string;
  type: CategoryType;
  icon: string;
  color: string;
  budget: number;
  tenantId: string;
}

const categoryRepository = new CRUDRepository<Category>('Category', CategorySchema);

export default categoryRepository;
