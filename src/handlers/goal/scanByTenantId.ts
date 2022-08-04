import { apiGwProxy } from 'src/decorators/apiGatewayProxy';
import { accountValidator } from 'src/validators/create-account-.validator';
import SavingGoalRepository from 'src/repositories/goal';

export const handler = apiGwProxy({
  validator: accountValidator,
  handler: async (event) => {
    const tenantId = event.requestContext.authorizer?.claims.sub;

    const repository = new SavingGoalRepository();

    const goals = await repository.getByTenantId(tenantId);

    return {
      statusCode: 200,
      body: JSON.stringify(goals)
    };
  }
});
