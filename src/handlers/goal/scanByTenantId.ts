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

    const repository = new SavingGoalRepository();

    const goals = await repository.getByTenantId(tenantId);

    return {
      statusCode: 200,
      body: JSON.stringify(goals)
    };
  }
});
