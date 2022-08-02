import * as uuid from 'uuid';
import { DynamoDB } from 'aws-sdk';
import { apiGwProxy } from 'src/decorators/apiGatewayProxy';

import { createProductValidator } from './../validators/create-product.validator';

const dynamoDb = new DynamoDB.DocumentClient();

interface ProductBody {
  text: string;
  price: number;
}

export const handler = apiGwProxy<ProductBody>({
  validator: createProductValidator,
  handler: async (event) => {
    const { text, price } = event.body!;
    const timestamp = new Date().getTime();
    const newProduct = {
      id: uuid.v4(),
      text,
      price,
      createdAt: timestamp,
      updatedAt: timestamp
    };
    const params = {
      TableName: process.env.DYNAMODB_TABLE!,
      Item: newProduct
    };

    await dynamoDb.put(params).promise();

    return {
      statusCode: 201,
      body: JSON.stringify(newProduct)
    };
  }
});
