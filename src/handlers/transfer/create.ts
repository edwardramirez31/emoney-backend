import * as uuid from 'uuid';
import { apiGwProxy } from 'src/decorators/apiGatewayProxy';
import TransferRepository, { TransferRequest } from 'src/repositories/transfer';
import { crateValidator } from 'src/validators/create-validator';
import transferSchema from 'src/validators/schemas/transfer';

export const handler = apiGwProxy<Omit<TransferRequest, 'id' | 'tenantId'>>({
  validator: crateValidator(transferSchema),
  handler: async (event) => {
    const body = event.body!;
    const tenantId = event.requestContext.authorizer?.claims.sub;

    const transfer = await TransferRepository.create({ id: uuid.v4(), tenantId, ...body });

    return {
      statusCode: 201,
      body: JSON.stringify(transfer.toJSON())
    };
  }
});
