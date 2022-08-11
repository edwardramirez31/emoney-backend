import { apiGwProxy } from 'src/decorators/apiGatewayProxy';
import TransactionRepository from 'src/repositories/transaction';

export const handler = apiGwProxy({
  handler: async (event) => {
    const tenantId = event.requestContext.authorizer?.claims.sub;

    const transaction = await TransactionRepository.getByTenantId(tenantId);

    return {
      statusCode: 200,
      body: JSON.stringify(transaction)
    };
  }
});
