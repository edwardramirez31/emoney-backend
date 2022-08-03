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

    const tramsfer = await repository.getById(id ?? '', tenantId);

    return {
      statusCode: 200,
      body: JSON.stringify(tramsfer.toJSON())
    };
  }
});
