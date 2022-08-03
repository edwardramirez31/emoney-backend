import { apiGwProxy } from 'src/decorators/apiGatewayProxy';
import TransactionRepository, { TransactionRequest } from 'src/repositories/transaction';
import { transactionValidator } from 'src/validators/transaction.validator';

export const handler = apiGwProxy<TransactionRequest>({
  validator: transactionValidator,
  handler: async (event) => {
    const body = event.body!;

    const repository = new TransactionRepository();

    const transaction = await repository.update({ ...body });

    return {
      statusCode: 200,
      body: JSON.stringify(transaction.toJSON())
    };
  }
});
