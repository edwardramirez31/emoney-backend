import * as uuid from 'uuid';
import { apiGwProxy } from 'src/decorators/apiGatewayProxy';
import TransferRepository, { TransferRequest } from 'src/repositories/transfer';
import { transferValidator } from 'src/validators/transfer.validator';

export const handler = apiGwProxy<Omit<TransferRequest, 'id'>>({
  validator: transferValidator,
  handler: async (event) => {
    const body = event.body!;

    const repository = new TransferRepository();

    const transfer = await repository.create({ id: uuid.v4(), ...body });

    return {
      statusCode: 201,
      body: JSON.stringify(transfer.toJSON())
    };
  }
});
