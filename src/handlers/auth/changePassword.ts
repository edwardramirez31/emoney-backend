import { apiGwProxy } from 'src/decorators/apiGatewayProxy';
import { cognitoService } from 'src/services';
import { crateValidator } from 'src/validators/create-validator';
import changePasswordSchema from 'src/validators/schemas/changePassword';

interface ChangePasswordRequest {
  previousPassword: string;
  accessToken: string;
  proposedPassword: string;
}

export const handler = apiGwProxy<ChangePasswordRequest>({
  validator: crateValidator(changePasswordSchema),
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
