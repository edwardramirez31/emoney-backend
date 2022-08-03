import { apiGwProxy } from 'src/decorators/apiGatewayProxy';
import CategoryRepository from 'src/repositories/category';

interface AccountBody {
  tenantId: string;
}

export const handler = apiGwProxy<AccountBody>({
  handler: async (event) => {
    const { tenantId } = event.body!;
    const { id } = event.pathParameters!;

    const repository = new CategoryRepository();

    const category = await repository.getById(id ?? '', tenantId);

    return {
      statusCode: 200,
      body: JSON.stringify(category.toJSON())
    };
  }
});
