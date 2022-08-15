import { USER_POOL_CLIENT_ID } from 'src/constants';
import { apiGwProxy } from 'src/decorators/apiGatewayProxy';
import { cognitoService } from 'src/services';
import { responseGenerator } from 'src/utils/responseGenerator';
import HttpStatusCode from 'src/utils/types';
import { crateValidator } from 'src/validators/create-validator';
import confirmForgotPasswordSchema from 'src/validators/schemas/confirmForgotPassword';

interface ConfirmForgotRequest {
  confirmationCode: string;
  password: string;
  email: string;
}

export const handler = apiGwProxy<ConfirmForgotRequest>({
  validator: crateValidator(confirmForgotPasswordSchema),
  handler: async (event) => {
    const { email, password, confirmationCode } = event.body!;

    const params = {
      ConfirmationCode: confirmationCode,
      Password: password,
      Username: email,
      ClientId: USER_POOL_CLIENT_ID ?? ''
    };

    const result = await cognitoService.confirmForgotPassword(params).promise();

    if (result.$response.error) {
      throw {
        response: {
          status: 400,
          body: { ...result.$response.error }
        }
      };
    }

    return responseGenerator({
      statusCode: HttpStatusCode.OK,
      body: {
        success: true
      }
    });
  }
});
