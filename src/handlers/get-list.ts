import { APIGatewayProxyHandler } from 'aws-lambda';
import { dynamoService } from 'src/services';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const handler: APIGatewayProxyHandler = async (_event) => {
  const result = await dynamoService
    .scan({
      TableName: process.env.DYNAMODB_TABLE!
    })
    .promise();

  const products = result.Items;

  if (!products) {
    return {
      statusCode: 404,
      body: JSON.stringify('Product not found')
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify(products)
  };
};
