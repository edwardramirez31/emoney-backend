import { apiGwProxy } from 'src/decorators/apiGatewayProxy';
import SavingGoalRepository from 'src/repositories/goal';

export const handler = apiGwProxy({
  handler: async (event) => {
    const tenantId = event.requestContext.authorizer?.claims.sub;

    const { id } = event.pathParameters!;

    const repository = new SavingGoalRepository();

    const goal = await repository.getById(id ?? '', tenantId);

    return {
      statusCode: 200,
      body: JSON.stringify(goal.toJSON())
    };
  }
});
