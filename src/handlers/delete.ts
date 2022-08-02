import { APIGatewayProxyHandler } from 'aws-lambda';
import { dynamoService } from 'src/services';

export const handler: APIGatewayProxyHandler = async (event) => {
  const result = await dynamoService
    .delete({
      TableName: process.env.DYNAMODB_TABLE!,
      Key: {
        id: event.pathParameters?.id
      }
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
};
