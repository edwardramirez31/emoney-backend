import { apiGwProxy } from 'src/decorators/apiGatewayProxy';
import { REFRESH_TOKEN_AUTH_FLOW } from 'src/constants';
import { crateValidator } from 'src/validators/create-validator';
import logoutSchema from 'src/validators/schemas/logout';
import { responseGenerator } from 'src/utils/responseGenerator';
import HttpStatusCode from 'src/utils/types';

import { authenticateUser } from './login';

interface RefreshTokenRequest {
  refreshToken: string;
}

export const handler = apiGwProxy<RefreshTokenRequest>({
  validator: crateValidator(logoutSchema),
  handler: async (event) => {
    const { refreshToken } = event.body!;

    const authResponse = await authenticateUser({
      authParameters: {
        REFRESH_TOKEN: refreshToken
      },
      authFlow: REFRESH_TOKEN_AUTH_FLOW
    });

    return responseGenerator({ statusCode: HttpStatusCode.OK, body: { ...authResponse } });
  }
});
