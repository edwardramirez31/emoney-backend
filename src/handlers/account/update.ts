import { apiGwProxy } from 'src/decorators/apiGatewayProxy';
import { accountValidator } from 'src/validators/create-account-.validator';
import AccountRepository, { AccountRequest } from 'src/repositories/account';

export const handler = apiGwProxy<Omit<AccountRequest, 'id'>>({
  validator: accountValidator,
  handler: async (event) => {
    const body = event.body!;
    const { id } = event.pathParameters!;

    const repository = new AccountRepository();

    const account = await repository.update({ id: id ?? '', ...body });

    return {
      statusCode: 200,
      body: JSON.stringify(account.toJSON())
    };
  }
});
