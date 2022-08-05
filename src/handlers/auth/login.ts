import { apiGwProxy } from 'src/decorators/apiGatewayProxy';
import { USER_POOL_ID, USER_POOL_CLIENT_ID, AUTH_FLOW } from 'src/constants';
import { cognitoService } from 'src/services';
import { CognitoIdentityServiceProvider } from 'aws-sdk';
import { crateValidator } from 'src/validators/create-validator';
import authSchema from 'src/validators/schemas/auth';

interface LoginRequest {
  email: string;
  password: string;
}

interface AuthResponse {
  idToken: string | undefined;
  accessToken: string | undefined;
  refreshToken: string | undefined;
  expiresAt: number | undefined;
}

interface AuthenticateUserParams {
  authFlow?: string;
  authParameters: CognitoIdentityServiceProvider.AuthParametersType;
}

export const authenticateUser = async ({ authParameters, authFlow }: AuthenticateUserParams): Promise<AuthResponse> => {
  const params = {
    AuthFlow: authFlow ?? '',
    UserPoolId: USER_POOL_ID ?? '',
    ClientId: USER_POOL_CLIENT_ID ?? '',
    AuthParameters: {
      ...authParameters
    }
  };

  const response = await cognitoService.adminInitiateAuth(params).promise();
  // eslint-disable-next-line no-console
  console.log(JSON.stringify(response));
  if (!response.AuthenticationResult) {
    throw { response: { status: 400, body: { errorMessage: 'auth failed' } } };
  }

  const { IdToken, RefreshToken, AccessToken, ExpiresIn } = response.AuthenticationResult;

  return {
    idToken: IdToken,
    accessToken: AccessToken,
    refreshToken: RefreshToken,
    expiresAt: ExpiresIn
  };
};

export const handler = apiGwProxy<LoginRequest>({
  validator: crateValidator(authSchema),
  handler: async (event) => {
    const { email, password } = event.body!;

    const authResponse = await authenticateUser({
      authParameters: {
        USERNAME: email,
        PASSWORD: password
      },
      authFlow: AUTH_FLOW
    });

    return {
      statusCode: 200,
      body: JSON.stringify({
        ...authResponse
      })
    };
  }
});
