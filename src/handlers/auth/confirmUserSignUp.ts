import { apiGwProxy } from 'src/decorators/apiGatewayProxy';
import { USER_POOL_CLIENT_ID } from 'src/constants';
import { cognitoService } from 'src/services';
import { crateValidator } from 'src/validators/create-validator';
import confirmUserSignUpSchema from 'src/validators/schemas/confirmUserSignUp';

interface ConfirmUserSignUpRequest {
  confirmationCode: string;
  email: string;
}

export const handler = apiGwProxy<ConfirmUserSignUpRequest>({
  validator: crateValidator(confirmUserSignUpSchema),
  handler: async (event) => {
    const { confirmationCode, email } = event.body!;

    const params = {
      ClientId: USER_POOL_CLIENT_ID ?? '',
      Username: email,
      ConfirmationCode: confirmationCode
    };

    await cognitoService.confirmSignUp(params).promise();

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true })
    };
  }
});
