import { apiGwProxy } from 'src/decorators/apiGatewayProxy';
import CategoryRepository from 'src/repositories/category';

export const handler = apiGwProxy({
  handler: async (event) => {
    const tenantId = event.requestContext.authorizer?.claims.sub;

    const categories = await CategoryRepository.getByTenantId(tenantId);

    return {
      statusCode: 200,
      body: JSON.stringify(categories)
    };
  }
});
