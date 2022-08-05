import { apiGwProxy } from 'src/decorators/apiGatewayProxy';
import { REFRESH_TOKEN_AUTH_FLOW } from 'src/constants';
import { logoutValidator } from 'src/validators/logout.validator';

import { authenticateUser } from './login';

interface RefreshTokenRequest {
  refreshToken: string;
}

export const handler = apiGwProxy<RefreshTokenRequest>({
  validator: logoutValidator,
  handler: async (event) => {
    const { refreshToken } = event.body!;

    const authResponse = await authenticateUser({
      authParameters: {
        REFRESH_TOKEN: refreshToken
      },
      authFlow: REFRESH_TOKEN_AUTH_FLOW
    });

    return {
      statusCode: 200,
      body: JSON.stringify({
        ...authResponse
      })
    };
  }
});
