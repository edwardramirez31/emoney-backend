import { apiGwProxy } from 'src/decorators/apiGatewayProxy';
import { USER_POOL_CLIENT_ID, USER_POOL_ID } from 'src/constants';
import { cognitoService } from 'src/services';
import { crateValidator } from 'src/validators/create-validator';
import respondToAuthChallengeSchema from 'src/validators/schemas/respondToAuthChallenge';
import { responseGenerator } from 'src/utils/responseGenerator';
import HttpStatusCode from 'src/utils/types';

interface respondToAuthChallengeRequest {
  challengeName: string;
  session?: string;
  challengeResponses: { [key: string]: string };
}
// https://docs.aws.amazon.com/cognito-user-identity-pools/latest/APIReference/API_AdminRespondToAuthChallenge.html
// https://stackoverflow.com/questions/59317574/how-to-validate-data-based-on-an-input-value-with-ajv
// https://ajv.js.org/json-schema.html#discriminator
export const handler = apiGwProxy<respondToAuthChallengeRequest>({
  validator: crateValidator(respondToAuthChallengeSchema),
  handler: async (event) => {
    const { challengeName, session, challengeResponses } = event.body!;

    const params = {
      ClientId: USER_POOL_CLIENT_ID ?? '',
      UserPoolId: USER_POOL_ID ?? '',
      ChallengeName: challengeName,
      Session: session,
      ChallengeResponses: challengeResponses
    };

    const response = await cognitoService.adminRespondToAuthChallenge(params).promise();

    return responseGenerator({ statusCode: HttpStatusCode.OK, body: { ...response } });
  }
});
