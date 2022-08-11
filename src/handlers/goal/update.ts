import { apiGwProxy } from 'src/decorators/apiGatewayProxy';
import SavingGoalRepository, { SavingGoalRequest } from 'src/repositories/goal';
import { crateValidator } from 'src/validators/create-validator';
import goalSchema from 'src/validators/schemas/goal';

export const handler = apiGwProxy<Omit<SavingGoalRequest, 'id' | 'tenantId'>>({
  validator: crateValidator(goalSchema),
  handler: async (event) => {
    const body = event.body!;
    const tenantId = event.requestContext.authorizer?.claims.sub;
    const { id } = event.pathParameters!;

    const account = await SavingGoalRepository.update({ ...body }, { id: id ?? '', tenantId });

    return {
      statusCode: 200,
      body: JSON.stringify(account.toJSON())
    };
  }
});
