import { apiGwProxy } from 'src/decorators/apiGatewayProxy';
import CategoryRepository from 'src/repositories/category';

interface AccountBody {
  tenantId: string;
}

export const handler = apiGwProxy<AccountBody>({
  handler: async (event) => {
    const { tenantId } = event.body!;

    const repository = new CategoryRepository();

    const categories = await repository.getByTenantId(tenantId);

    return {
      statusCode: 200,
      body: JSON.stringify(categories)
    };
  }
});
