import categoryValidator from 'src/validators/schemas/category';
import { Category, CategorySchema } from 'src/models/category';

import CRUDController from '..';

const categoryController = new CRUDController<Category>(categoryValidator, 'Category', CategorySchema);

export const createCategoryHandler = categoryController.create();

export const updateCategoryHandler = categoryController.update();

export const getCategoryHandler = categoryController.getById();

export const getCategoriesHandler = categoryController.scanByTenantId();

export const deleteCategoryHandler = categoryController.delete();
