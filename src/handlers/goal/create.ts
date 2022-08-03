import * as uuid from 'uuid';
import { apiGwProxy } from 'src/decorators/apiGatewayProxy';
import { goalValidator } from 'src/validators/goal.validator';

import SavingGoalRepository, { SavingGoalRequest } from './../../repositories/goal';

export const handler = apiGwProxy<Omit<SavingGoalRequest, 'id'>>({
  validator: goalValidator,
  handler: async (event) => {
    const body = event.body!;

    const repository = new SavingGoalRepository();

    const goal = await repository.create({ id: uuid.v4(), ...body });

    return {
      statusCode: 201,
      body: JSON.stringify(goal.toJSON())
    };
  }
});
