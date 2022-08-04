import { apiGwProxy } from 'src/decorators/apiGatewayProxy';
import SavingGoalRepository, { SavingGoalRequest } from 'src/repositories/goal';
import { goalValidator } from 'src/validators/goal.validator';

export const handler = apiGwProxy<Omit<SavingGoalRequest, 'id' | 'tenantId'>>({
  validator: goalValidator,
  handler: async (event) => {
    const body = event.body!;
    const tenantId = event.requestContext.authorizer?.claims.sub;
    const { id } = event.pathParameters!;

    const repository = new SavingGoalRepository();

    const account = await repository.update({ id: id ?? '', tenantId, ...body });

    return {
      statusCode: 200,
      body: JSON.stringify(account.toJSON())
    };
  }
});
