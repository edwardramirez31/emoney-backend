import { apiGwProxy } from 'src/decorators/apiGatewayProxy';
import SavingGoalRepository from 'src/repositories/goal';

export const handler = apiGwProxy({
  handler: async (event) => {
    const { id } = event.pathParameters!;
    const tenantId = event.requestContext.authorizer?.claims.sub;

    await SavingGoalRepository.deleteById(id ?? '', tenantId);

    return {
      statusCode: 200,
      body: JSON.stringify({ success: 'true' })
    };
  }
});
