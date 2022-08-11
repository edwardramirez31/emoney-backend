import { apiGwProxy } from 'src/decorators/apiGatewayProxy';
import TransferRepository from 'src/repositories/transfer';

export const handler = apiGwProxy({
  handler: async (event) => {
    const { id } = event.pathParameters!;
    const tenantId = event.requestContext.authorizer?.claims.sub;

    const transfer = await TransferRepository.getById(id ?? '', tenantId);

    return {
      statusCode: 200,
      body: JSON.stringify(transfer.toJSON())
    };
  }
});
