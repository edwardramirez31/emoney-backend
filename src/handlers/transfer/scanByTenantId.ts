import { apiGwProxy } from 'src/decorators/apiGatewayProxy';
import TransferRepository from 'src/repositories/transfer';

interface AccountBody {
  tenantId: string;
}

export const handler = apiGwProxy<AccountBody>({
  handler: async (event) => {
    const { tenantId } = event.body!;

    const repository = new TransferRepository();

    const transfers = await repository.getByTenantId(tenantId);

    return {
      statusCode: 200,
      body: JSON.stringify(transfers)
    };
  }
});
