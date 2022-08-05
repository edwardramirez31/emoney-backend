import { apiGwProxy } from 'src/decorators/apiGatewayProxy';
import { USER_POOL_CLIENT_ID } from 'src/constants';
import { cognitoService } from 'src/services';
import { crateValidator } from 'src/validators/create-validator';
import authSchema from 'src/validators/schemas/auth';

interface SignUpRequest {
  email: string;
  password: string;
}

// https://docs.aws.amazon.com/cognito-user-identity-pools/latest/APIReference/API_SignUp.html

export const handler = apiGwProxy<SignUpRequest>({
  validator: crateValidator(authSchema),
  handler: async (event) => {
    const { email, password } = event.body!;

    const createUserParams = {
      ClientId: USER_POOL_CLIENT_ID ?? '',
      Username: email,
      Password: password,
      UserAttributes: [
        {
          Name: 'email',
          Value: email
        }
      ]
    };
    const response = await cognitoService.signUp(createUserParams).promise();

    return {
      statusCode: 200,
      body: JSON.stringify({ ...response })
    };
  }
});
