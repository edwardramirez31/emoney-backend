import { USER_POOL_CLIENT_ID } from 'src/constants';
import { apiGwProxy } from 'src/decorators/apiGatewayProxy';
import { cognitoService } from 'src/services';
import { responseGenerator } from 'src/utils/responseGenerator';
import HttpStatusCode from 'src/utils/types';
import { crateValidator } from 'src/validators/create-validator';
import forgotPasswordSchema from 'src/validators/schemas/forgotPassword';

interface ForgotRequest {
  email: string;
}

export const handler = apiGwProxy<ForgotRequest>({
  validator: crateValidator(forgotPasswordSchema),
  handler: async (event) => {
    const { email } = event.body!;

    const params = {
      Username: email,
      ClientId: USER_POOL_CLIENT_ID ?? ''
    };

    const result = await cognitoService.forgotPassword(params).promise();

    return responseGenerator({ statusCode: HttpStatusCode.OK, body: { ...result } });
  }
});
