import { apiGwProxy } from 'src/decorators/apiGatewayProxy';
import TransactionRepository from 'src/repositories/transaction';

interface AccountBody {
  tenantId: string;
}

export const handler = apiGwProxy<AccountBody>({
  handler: async (event) => {
    const { tenantId } = event.body!;

    const repository = new TransactionRepository();

    const transaction = await repository.getByTenantId(tenantId);

    return {
      statusCode: 200,
      body: JSON.stringify(transaction)
    };
  }
});
