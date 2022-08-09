import { USER_POOL_CLIENT_ID } from 'src/constants';
import { apiGwProxy } from 'src/decorators/apiGatewayProxy';
import { cognitoService } from 'src/services';
import { crateValidator } from 'src/validators/create-validator';
import forgotPasswordSchema from 'src/validators/schemas/forgotPassword';

interface ResendConfirmationCodeRequest {
  email: string;
}

export const handler = apiGwProxy<ResendConfirmationCodeRequest>({
  validator: crateValidator(forgotPasswordSchema),
  handler: async (event) => {
    const { email } = event.body!;

    const params = {
      Username: email,
      ClientId: USER_POOL_CLIENT_ID ?? ''
    };

    const result = await cognitoService.resendConfirmationCode(params).promise();

    return {
      statusCode: 200,
      body: JSON.stringify({
        ...result
      })
    };
  }
});
