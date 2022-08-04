import { apiGwProxy } from 'src/decorators/apiGatewayProxy';
import AccountRepository from 'src/repositories/account';

export const handler = apiGwProxy({
  handler: async (event) => {
    const tenantId = event.requestContext.authorizer?.claims.sub;

    const repository = new AccountRepository();

    const accounts = await repository.getByTenantId(tenantId);

    return {
      statusCode: 200,
      body: JSON.stringify(accounts)
    };
  }
});
