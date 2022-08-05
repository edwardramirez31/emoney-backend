import * as uuid from 'uuid';
import { apiGwProxy } from 'src/decorators/apiGatewayProxy';
import AccountRepository, { AccountRequest } from 'src/repositories/account';
import { crateValidator } from 'src/validators/create-validator';
import accountSchema from 'src/validators/schemas/account';

export const handler = apiGwProxy<Omit<AccountRequest, 'id' | 'tenantId'>>({
  validator: crateValidator(accountSchema),
  handler: async (event) => {
    const body = event.body!;
    const tenantId = event.requestContext.authorizer?.claims.sub;

    const repository = new AccountRepository();

    const account = await repository.create({ id: uuid.v4(), tenantId, ...body });

    return {
      statusCode: 201,
      body: JSON.stringify(account.toJSON())
    };
  }
});
