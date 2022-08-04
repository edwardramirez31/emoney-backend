import { apiGwProxy } from 'src/decorators/apiGatewayProxy';
import AccountRepository from 'src/repositories/account';

interface AccountBody {
  id: string;
}

export const handler = apiGwProxy<AccountBody>({
  handler: async (event) => {
    const { id } = event.pathParameters!;
    const tenantId = event.requestContext.authorizer?.claims.sub;

    const repository = new AccountRepository();

    const account = await repository.getById(id ?? '', tenantId);

    if (!account) {
      return {
        statusCode: 404,
        body: JSON.stringify({ success: false, message: 'Account not found' })
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify(account.toJSON())
    };
  }
});
