import { apiGwProxy } from 'src/decorators/apiGatewayProxy';
import { accountValidator } from 'src/validators/create-account-.validator';
import SavingGoalRepository from 'src/repositories/goal';

interface AccountBody {
  tenantId: string;
}

export const handler = apiGwProxy<AccountBody>({
  validator: accountValidator,
  handler: async (event) => {
    const { tenantId } = event.body!;
    const { id } = event.pathParameters!;

    const repository = new SavingGoalRepository();

    const goal = await repository.getById(id ?? '', tenantId);

    return {
      statusCode: 200,
      body: JSON.stringify(goal.toJSON())
    };
  }
});
