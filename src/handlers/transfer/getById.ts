import { apiGwProxy } from 'src/decorators/apiGatewayProxy';
import TransferRepository from 'src/repositories/transfer';

export const handler = apiGwProxy({
  handler: async (event) => {
    const { id } = event.pathParameters!;
    const tenantId = event.requestContext.authorizer?.claims.sub;

    const repository = new TransferRepository();

    const tramsfer = await repository.getById(id ?? '', tenantId);

    return {
      statusCode: 200,
      body: JSON.stringify(tramsfer.toJSON())
    };
  }
});
