import { apiGwProxy } from 'src/decorators/apiGatewayProxy';
import { USER_POOL_ID } from 'src/constants';
import { cognitoService } from 'src/services';
import { authValidator } from 'src/validators/auth.validator';

import { authenticateUser } from './login';

interface SignUpRequest {
  email: string;
  password: string;
}

export const handler = apiGwProxy<SignUpRequest>({
  validator: authValidator,
  handler: async (event) => {
    const { email, password } = event.body!;

    const createUserParams = {
      UserPoolId: USER_POOL_ID ?? '',
      Username: email,
      UserAttributes: [
        {
          Name: 'email',
          Value: email
        },
        {
          Name: 'email_verified',
          Value: 'true'
        }
      ],
      MessageAction: 'SUPPRESS'
    };
    const response = await cognitoService.adminCreateUser(createUserParams).promise();
    // eslint-disable-next-line no-console
    console.log(response);

    if (!response.User) {
      throw { response: { status: 400, body: { errorMessage: 'auth failed' } } };
    }

    const setPasswordParams = {
      Password: password,
      UserPoolId: USER_POOL_ID ?? '',
      Username: email,
      Permanent: true
    };
    await cognitoService.adminSetUserPassword(setPasswordParams).promise();

    const authResponse = await authenticateUser(event.body!);
    const { Username: userId, Attributes: userData } = response.User;

    return {
      statusCode: 201,
      body: JSON.stringify({ userId, userData, ...authResponse })
    };
  }
});
