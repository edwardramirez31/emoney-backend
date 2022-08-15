import { APIGatewayProxyResult } from 'aws-lambda';

import { HttpStatusCode } from './types';

interface ResponseGenerator {
  statusCode: HttpStatusCode;
  body: Record<string, unknown>;
  headers?: Record<string, string>;
}

export const responseGenerator = ({ statusCode, body, headers = {} }: ResponseGenerator): APIGatewayProxyResult => ({
  statusCode,
  headers: { ...headers, 'Access-Control-Allow-Origin': 'http://localhost:3002', 'Access-Control-Allow-Credentials': true },
  body: JSON.stringify(body)
});
