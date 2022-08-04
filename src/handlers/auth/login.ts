import { apiGwProxy } from 'src/decorators/apiGatewayProxy';
import { USER_POOL_ID, USER_POOL_CLIENT_ID, AUTH_FLOW } from 'src/constants';
import { cognitoService } from 'src/services';
import { authValidator } from 'src/validators/auth.validator';

interface LoginRequest {
  email: string;
  password: string;
}

interface AuthResponse {
  accessToken: string | undefined;
  refreshToken: string | undefined;
  expiresAt: number | undefined;
}

export const authenticateUser = async ({ email, password }: LoginRequest): Promise<AuthResponse> => {
  const params = {
    AuthFlow: AUTH_FLOW ?? '',
    UserPoolId: USER_POOL_ID ?? '',
    ClientId: USER_POOL_CLIENT_ID ?? '',
    AuthParameters: {
      USERNAME: email,
      PASSWORD: password
    }
  };

  const response = await cognitoService.adminInitiateAuth(params).promise();
  // eslint-disable-next-line no-console
  console.log(JSON.stringify(response));
  if (!response.AuthenticationResult) {
    throw { response: { status: 400, body: { errorMessage: 'auth failed' } } };
  }

  const { IdToken, RefreshToken, ExpiresIn } = response.AuthenticationResult;

  return {
    accessToken: IdToken,
    refreshToken: RefreshToken,
    expiresAt: ExpiresIn
  };
};

export const handler = apiGwProxy<LoginRequest>({
  validator: authValidator,
  handler: async (event) => {
    const authResponse = await authenticateUser(event.body!);

    return {
      statusCode: 200,
      body: JSON.stringify({
        ...authResponse
      })
    };
  }
});
