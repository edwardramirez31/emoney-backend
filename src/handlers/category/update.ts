import { apiGwProxy } from 'src/decorators/apiGatewayProxy';
import { crateValidator } from 'src/validators/create-validator';
import categorySchema from 'src/validators/schemas/category';

import CategoryRepository, { CategoryRequest } from './../../repositories/category';

export const handler = apiGwProxy<Omit<CategoryRequest, 'id' | 'tenantId'>>({
  validator: crateValidator(categorySchema),
  handler: async (event) => {
    const body = event.body!;
    const { id } = event.pathParameters!;
    const tenantId = event.requestContext.authorizer?.claims.sub;
    const repository = new CategoryRepository();

    const category = await repository.update({ id: id ?? '', tenantId, ...body });

    return {
      statusCode: 200,
      body: JSON.stringify(category.toJSON())
    };
  }
});
