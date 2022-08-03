import { apiGwProxy } from 'src/decorators/apiGatewayProxy';
import AccountRepository from 'src/repositories/account';

interface AccountBody {
  tenantId: string;
}

export const handler = apiGwProxy<AccountBody>({
  handler: async (event) => {
    const { tenantId } = event.body!;

    const repository = new AccountRepository();

    const accounts = await repository.getByTenantId(tenantId);

    return {
      statusCode: 200,
      body: JSON.stringify(accounts)
    };
  }
});
