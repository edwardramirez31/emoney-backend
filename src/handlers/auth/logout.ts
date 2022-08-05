import { apiGwProxy } from 'src/decorators/apiGatewayProxy';
import { USER_POOL_CLIENT_ID } from 'src/constants';
import { cognitoService } from 'src/services';
import { crateValidator } from 'src/validators/create-validator';
import logoutSchema from 'src/validators/schemas/logout';

interface LogoutRequest {
  refreshToken: string;
}

export const handler = apiGwProxy<LogoutRequest>({
  validator: crateValidator(logoutSchema),
  handler: async (event) => {
    const { refreshToken } = event.body!;

    const params = {
      ClientId: USER_POOL_CLIENT_ID ?? '',
      Token: refreshToken
    };

    const result = await cognitoService.revokeToken(params).promise();

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
