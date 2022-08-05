import { apiGwProxy } from 'src/decorators/apiGatewayProxy';
import TransactionRepository, { TransactionRequest } from 'src/repositories/transaction';
import { crateValidator } from 'src/validators/create-validator';
import transactionSchema from 'src/validators/schemas/transaction';

export const handler = apiGwProxy<Omit<TransactionRequest, 'id' | 'tenantId'>>({
  validator: crateValidator(transactionSchema),
  handler: async (event) => {
    const body = event.body!;
    const tenantId = event.requestContext.authorizer?.claims.sub;
    const { id } = event.pathParameters!;

    const repository = new TransactionRepository();

    const transaction = await repository.update({ id: id ?? '', tenantId, ...body });

    return {
      statusCode: 200,
      body: JSON.stringify(transaction.toJSON())
    };
  }
});
