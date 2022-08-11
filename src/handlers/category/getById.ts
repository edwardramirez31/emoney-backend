import { apiGwProxy } from 'src/decorators/apiGatewayProxy';
import CategoryRepository from 'src/repositories/category';

export const handler = apiGwProxy({
  handler: async (event) => {
    const { id } = event.pathParameters!;
    const tenantId = event.requestContext.authorizer?.claims.sub;

    const category = await CategoryRepository.getById(id ?? '', tenantId);

    return {
      statusCode: 200,
      body: JSON.stringify(category.toJSON())
    };
  }
});
