import { apiGwProxy } from 'src/decorators/apiGatewayProxy';
import { USER_POOL_CLIENT_ID } from 'src/constants';
import { cognitoService } from 'src/services';
import { crateValidator } from 'src/validators/create-validator';
import signUpSchema from 'src/validators/schemas/signUp';
import { responseGenerator } from 'src/utils/responseGenerator';

import { HttpStatusCode } from './../../utils/types';

interface SignUpRequest {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
}

// https://docs.aws.amazon.com/cognito-user-identity-pools/latest/APIReference/API_SignUp.html

export const handler = apiGwProxy<SignUpRequest>({
  validator: crateValidator(signUpSchema),
  handler: async (event) => {
    const { email, password, first_name, last_name } = event.body!;

    const createUserParams = {
      ClientId: USER_POOL_CLIENT_ID ?? '',
      Username: email,
      Password: password,
      UserAttributes: [
        {
          Name: 'email',
          Value: email
        },
        {
          Name: 'custom:first_name',
          Value: first_name
        },
        {
          Name: 'custom:last_name',
          Value: last_name
        }
      ]
    };
    const response = await cognitoService.signUp(createUserParams).promise();

    return responseGenerator({ statusCode: HttpStatusCode.OK, body: { ...response } });
  }
});
