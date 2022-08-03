import * as uuid from 'uuid';
import { apiGwProxy } from 'src/decorators/apiGatewayProxy';
import CategoryRepository, { CategoryRequest } from 'src/repositories/category';
import { categoryValidator } from 'src/validators/category.validator';

export const handler = apiGwProxy<Omit<CategoryRequest, 'id'>>({
  validator: categoryValidator,
  handler: async (event) => {
    const body = event.body!;

    const repository = new CategoryRepository();

    const category = await repository.create({ id: uuid.v4(), ...body });

    return {
      statusCode: 201,
      body: JSON.stringify(category.toJSON())
    };
  }
});
