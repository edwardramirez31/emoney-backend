import { apiGwProxy } from 'src/decorators/apiGatewayProxy';
import AccountRepository, { AccountRequest } from 'src/repositories/account';
import { crateValidator } from 'src/validators/create-validator';
import accountSchema from 'src/validators/schemas/account';

export const handler = apiGwProxy<Omit<AccountRequest, 'id' | 'tenantId'>>({
  validator: crateValidator(accountSchema),
  handler: async (event) => {
    const body = event.body!;
    const { id } = event.pathParameters!;
    const tenantId = event.requestContext.authorizer?.claims.sub;

    const repository = new AccountRepository();

    const account = await repository.update({ id: id ?? '', tenantId, ...body });

    return {
      statusCode: 200,
      body: JSON.stringify(account.toJSON())
    };
  }
});
