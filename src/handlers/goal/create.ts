import * as uuid from 'uuid';
import { apiGwProxy } from 'src/decorators/apiGatewayProxy';
import { goalValidator } from 'src/validators/goal.validator';

import SavingGoalRepository, { SavingGoalRequest } from './../../repositories/goal';

export const handler = apiGwProxy<Omit<SavingGoalRequest, 'id' | 'tenantId'>>({
  validator: goalValidator,
  handler: async (event) => {
    const body = event.body!;
    const tenantId = event.requestContext.authorizer?.claims.sub;

    const repository = new SavingGoalRepository();

    const goal = await repository.create({ id: uuid.v4(), tenantId, ...body });

    return {
      statusCode: 201,
      body: JSON.stringify(goal.toJSON())
    };
  }
});
