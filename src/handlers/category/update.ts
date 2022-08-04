import { apiGwProxy } from 'src/decorators/apiGatewayProxy';
import { categoryValidator } from 'src/validators/category.validator';

import CategoryRepository, { CategoryRequest } from './../../repositories/category';

export const handler = apiGwProxy<Omit<CategoryRequest, 'id' | 'tenantId'>>({
  validator: categoryValidator,
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
