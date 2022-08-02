import { APIGatewayProxyHandler } from 'aws-lambda';
import { dynamoService } from 'src/services';

export const handler: APIGatewayProxyHandler = async (event) => {
  const id = event.pathParameters?.id;

  const result = await dynamoService
    .get({
      TableName: process.env.DYNAMODB_TABLE!,
      Key: {
        id
      }
    })
    .promise();

  const product = result.Item;

  if (!product) {
    return {
      statusCode: 404,
      body: JSON.stringify('Product not found')
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify(product)
  };
};
