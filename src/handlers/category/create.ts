import * as uuid from 'uuid';
import { apiGwProxy } from 'src/decorators/apiGatewayProxy';
import CategoryRepository, { CategoryRequest } from 'src/repositories/category';
import { crateValidator } from 'src/validators/create-validator';
import categorySchema from 'src/validators/schemas/category';

export const handler = apiGwProxy<Omit<CategoryRequest, 'id' | 'tenantId'>>({
  validator: crateValidator(categorySchema),
  handler: async (event) => {
    const body = event.body!;
    const tenantId = event.requestContext.authorizer?.claims.sub;

    const category = await CategoryRepository.create({ id: uuid.v4(), tenantId, ...body });

    return {
      statusCode: 201,
      body: JSON.stringify(category.toJSON())
    };
  }
});
