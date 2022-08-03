import { apiGwProxy } from 'src/decorators/apiGatewayProxy';
import TransferRepository, { TransferRequest } from 'src/repositories/transfer';
import { transferValidator } from 'src/validators/transfer.validator';

export const handler = apiGwProxy<TransferRequest>({
  validator: transferValidator,
  handler: async (event) => {
    const body = event.body!;

    const repository = new TransferRepository();

    const transfer = await repository.update({ ...body });

    return {
      statusCode: 200,
      body: JSON.stringify(transfer.toJSON())
    };
  }
});
