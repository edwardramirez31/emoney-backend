import { USER_POOL_ID } from 'src/constants';
import { apiGwProxy } from 'src/decorators/apiGatewayProxy';
import { cognitoService } from 'src/services';

export const handler = apiGwProxy({
  handler: async (event) => {
    const username = event.requestContext.authorizer?.claims.email;

    const params = {
      Username: username,
      UserPoolId: USER_POOL_ID ?? ''
    };

    const response = await cognitoService.adminGetUser(params).promise();

    return {
      statusCode: 200,
      body: JSON.stringify({
        ...response
      })
    };
  }
});
