import { apiGwProxy } from 'src/decorators/apiGatewayProxy';
import TransferRepository from 'src/repositories/transfer';

export const handler = apiGwProxy({
  handler: async (event) => {
    const tenantId = event.requestContext.authorizer?.claims.sub;

    const repository = new TransferRepository();

    const transfers = await repository.getByTenantId(tenantId);

    return {
      statusCode: 200,
      body: JSON.stringify(transfers)
    };
  }
});
