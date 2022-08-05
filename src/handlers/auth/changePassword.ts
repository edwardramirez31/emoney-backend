import { apiGwProxy } from 'src/decorators/apiGatewayProxy';
import { cognitoService } from 'src/services';
import { changePasswordValidator } from 'src/validators/changePassword.validator';

interface ChangePasswordRequest {
  previousPassword: string;
  accessToken: string;
  proposedPassword: string;
}

export const handler = apiGwProxy<ChangePasswordRequest>({
  validator: changePasswordValidator,
  handler: async (event) => {
    const { previousPassword, proposedPassword, accessToken } = event.body!;

    const params = {
      AccessToken: accessToken,
      PreviousPassword: previousPassword,
      ProposedPassword: proposedPassword
    };

    const result = await cognitoService.changePassword(params).promise();

    if (result.$response.error) {
      throw { response: { status: 400, body: { ...result.$response.error } } };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true
      })
    };
  }
});
