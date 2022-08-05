import { USER_POOL_ID } from 'src/constants';
import { apiGwProxy } from 'src/decorators/apiGatewayProxy';
import { cognitoService } from 'src/services';
import { crateValidator } from 'src/validators/create-validator';
import profileSchema from 'src/validators/schemas/profile';

interface ProfileRequest {
  userAttributes: { email?: string; name?: string; phone_number?: string; picture?: string };
}

export const handler = apiGwProxy<ProfileRequest>({
  validator: crateValidator(profileSchema),
  handler: async (event) => {
    const { userAttributes } = event.body!;
    const username = event.requestContext.authorizer?.claims.email;

    console.log(JSON.stringify(event.requestContext.authorizer?.claims));
    const mappedAttributes = Object.entries(userAttributes).map(([name, value]) => ({
      Name: name,
      Value: value
    }));

    const params = {
      Username: username,
      UserAttributes: mappedAttributes,
      UserPoolId: USER_POOL_ID ?? ''
    };

    await cognitoService.adminUpdateUserAttributes(params).promise();

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true
      })
    };
  }
});
