import { apiGwProxy } from 'src/decorators/apiGatewayProxy';
import { cognitoService } from 'src/services';
import { crateValidator } from 'src/validators/create-validator';
import associateMFASchema from 'src/validators/schemas/associateMFA';
import QR from 'qrcode';

interface associateMFARequest {
  accessToken: string;
}

export const handler = apiGwProxy<associateMFARequest>({
  validator: crateValidator(associateMFASchema),
  handler: async (event) => {
    const { accessToken } = event.body!;

    const params = {
      AccessToken: accessToken
    };

    const result = await cognitoService.associateSoftwareToken(params).promise();
    const response = await QR.toDataURL(`otpauth://totp/${decodeURI('eMoney')}?secret=${result.SecretCode}`);

    return {
      statusCode: 200,
      body: JSON.stringify({
        codeURL: response
      })
    };
  }
});
