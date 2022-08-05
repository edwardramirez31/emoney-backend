import { USER_POOL_CLIENT_ID } from 'src/constants';
import { apiGwProxy } from 'src/decorators/apiGatewayProxy';
import { cognitoService } from 'src/services';
import { crateValidator } from 'src/validators/create-validator';
import forgotPasswordSchema from 'src/validators/schemas/forgotPassword';

interface ForgotRequest {
  email: string;
}

export const handler = apiGwProxy<ForgotRequest>({
  validator: crateValidator(forgotPasswordSchema),
  handler: async (event) => {
    const { email } = event.body!;

    const params = {
      Username: email,
      ClientId: USER_POOL_CLIENT_ID ?? ''
    };

    const result = await cognitoService.forgotPassword(params).promise();

    if (!result.CodeDeliveryDetails) {
      throw {
        response: {
          status: 400,
          body: { ...result.$response.error }
        }
      };
    }
    const { AttributeName: attributeName, DeliveryMedium: deliveryMedium, Destination: destination } = result.CodeDeliveryDetails;

    return {
      statusCode: 200,
      body: JSON.stringify({
        deliveryDetails: {
          attributeName,
          deliveryMedium,
          destination
        }
      })
    };
  }
});
