import { apiGwProxy } from 'src/decorators/apiGatewayProxy';
import SavingGoalRepository from 'src/repositories/goal';

export const handler = apiGwProxy({
  handler: async (event) => {
    const tenantId = event.requestContext.authorizer?.claims.sub;

    const goals = await SavingGoalRepository.getByTenantId(tenantId);

    return {
      statusCode: 200,
      body: JSON.stringify(goals)
    };
  }
});
