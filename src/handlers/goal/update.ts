import { apiGwProxy } from 'src/decorators/apiGatewayProxy';
import SavingGoalRepository, { SavingGoalRequest } from 'src/repositories/goal';
import { goalValidator } from 'src/validators/goal.validator';

export const handler = apiGwProxy<SavingGoalRequest>({
  validator: goalValidator,
  handler: async (event) => {
    const body = event.body!;

    const repository = new SavingGoalRepository();

    const account = await repository.update({ ...body });

    return {
      statusCode: 200,
      body: JSON.stringify(account.toJSON())
    };
  }
});
