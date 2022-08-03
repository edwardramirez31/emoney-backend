import * as uuid from 'uuid';
import { apiGwProxy } from 'src/decorators/apiGatewayProxy';
import { accountValidator } from 'src/validators/create-account-.validator';
import AccountRepository, { AccountRequest } from 'src/repositories/account';

export const handler = apiGwProxy<Omit<AccountRequest, 'id'>>({
  validator: accountValidator,
  handler: async (event) => {
    const body = event.body!;

    const repository = new AccountRepository();

    const account = await repository.create({ id: uuid.v4(), ...body });

    return {
      statusCode: 201,
      body: JSON.stringify(account.toJSON())
    };
  }
});
