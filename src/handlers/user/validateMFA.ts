import { apiGwProxy } from 'src/decorators/apiGatewayProxy';
import { cognitoService } from 'src/services';
import { responseGenerator } from 'src/utils/responseGenerator';
import { HttpStatusCode } from 'src/utils/types';
import { crateValidator } from 'src/validators/create-validator';
import validateMFASchema from 'src/validators/schemas/validateMFA';

interface ValidateMFARequest {
  accessToken: string;
  code: string;
}

export const handler = apiGwProxy<ValidateMFARequest>({
  validator: crateValidator(validateMFASchema),
  handler: async (event) => {
    const { accessToken, code } = event.body!;

    const params = {
      AccessToken: accessToken,
      UserCode: code
    };

    const result = await cognitoService.verifySoftwareToken(params).promise();

    if (result.Status && result.Status === 'SUCCESS') {
      await cognitoService
        .setUserMFAPreference({
          AccessToken: accessToken,
          SoftwareTokenMfaSettings: {
            Enabled: true,
            PreferredMfa: true
          }
        })
        .promise();
    }

    return responseGenerator({ statusCode: HttpStatusCode.OK, body: { ...result } });
  }
});
