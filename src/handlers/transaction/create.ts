import * as uuid from 'uuid';
import { apiGwProxy } from 'src/decorators/apiGatewayProxy';
import { transactionValidator } from 'src/validators/transaction.validator';
import TransactionRepository, { TransactionRequest } from 'src/repositories/transaction';

export const handler = apiGwProxy<Omit<TransactionRequest, 'id'>>({
  validator: transactionValidator,
  handler: async (event) => {
    const body = event.body!;

    const repository = new TransactionRepository();

    const transaction = await repository.create({ id: uuid.v4(), ...body });

    return {
      statusCode: 201,
      body: JSON.stringify(transaction.toJSON())
    };
  }
});
