import { apiGwProxy } from 'src/decorators/apiGatewayProxy';
import { dynamoService } from 'src/services';
import { updateProductValidator } from 'src/validators/update-product.validator';

interface ProductBody {
  text: string;
  price: number;
}

export const handler = apiGwProxy<ProductBody>({
  validator: updateProductValidator,
  handler: async (event) => {
    const { text, price } = event.body!;
    const id = event.pathParameters?.id;
    const timestamp = new Date().getTime();

    const result = await dynamoService
      .update({
        TableName: process.env.DYNAMODB_TABLE!,
        Key: {
          id
        },
        UpdateExpression: 'SET #todo_text = :text, price = :price, updatedAt = :updatedAt',
        ExpressionAttributeNames: {
          '#todo_text': 'text'
        },
        ExpressionAttributeValues: {
          ':text': text,
          ':price': price,
          ':updatedAt': timestamp
        },
        ReturnValues: 'ALL_NEW'
      })
      .promise();

    if (result.$response.error) {
      return {
        statusCode: result.$response.error.statusCode || 501,
        body: JSON.stringify(result.$response.error.message)
      };
    }

    // eslint-disable-next-line no-console
    console.log(result);

    return {
      statusCode: 200,
      body: JSON.stringify(result.Attributes)
    };
  }
});
