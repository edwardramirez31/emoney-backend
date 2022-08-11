import { apiGwProxy } from 'src/decorators/apiGatewayProxy';
import TransferRepository, { TransferRequest } from 'src/repositories/transfer';
import { crateValidator } from 'src/validators/create-validator';
import transferSchema from 'src/validators/schemas/transfer';

export const handler = apiGwProxy<Omit<TransferRequest, 'id' | 'tenantId'>>({
  validator: crateValidator(transferSchema),
  handler: async (event) => {
    const body = event.body!;

    const tenantId = event.requestContext.authorizer?.claims.sub;
    const { id } = event.pathParameters!;

    const transfer = await TransferRepository.update({ ...body }, { id: id ?? '', tenantId });

    return {
      statusCode: 200,
      body: JSON.stringify(transfer.toJSON())
    };
  }
});
