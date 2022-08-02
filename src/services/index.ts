import { DynamoDB } from 'aws-sdk';

export const dynamoService = new DynamoDB.DocumentClient();
