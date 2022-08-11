import CategoryRepository from 'src/repositories/category';
import { apiGwProxy } from 'src/decorators/apiGatewayProxy';

export const handler = apiGwProxy({
  handler: async (event) => {
    const tenantId = event.requestContext.authorizer?.claims.sub;

    const { id } = event.pathParameters!;

    await CategoryRepository.deleteById(id ?? '', tenantId);

    return {
      statusCode: 200,
      body: JSON.stringify({ success: 'true' })
    };
  }
});
