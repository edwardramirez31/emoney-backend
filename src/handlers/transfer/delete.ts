import { apiGwProxy } from 'src/decorators/apiGatewayProxy';
import TransferRepository from 'src/repositories/transfer';

interface AccountBody {
  tenantId: string;
}

export const handler = apiGwProxy<AccountBody>({
  handler: async (event) => {
    const { tenantId } = event.body!;
    const { id } = event.pathParameters!;

    const repository = new TransferRepository();

    await repository.deleteById(id ?? '', tenantId);

    return {
      statusCode: 200,
      body: JSON.stringify({ success: 'true' })
    };
  }
});
