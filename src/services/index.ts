import { CognitoIdentityServiceProvider, DynamoDB } from 'aws-sdk';

export const dynamoService = new DynamoDB.DocumentClient();

export const cognitoService = new CognitoIdentityServiceProvider();
