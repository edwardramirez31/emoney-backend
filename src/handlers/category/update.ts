import { apiGwProxy } from 'src/decorators/apiGatewayProxy';
import { categoryValidator } from 'src/validators/category.validator';

import CategoryRepository, { CategoryRequest } from './../../repositories/category';

export const handler = apiGwProxy<CategoryRequest>({
  validator: categoryValidator,
  handler: async (event) => {
    const body = event.body!;

    const repository = new CategoryRepository();

    const account = await repository.update({ ...body });

    return {
      statusCode: 200,
      body: JSON.stringify(account.toJSON())
    };
  }
});
