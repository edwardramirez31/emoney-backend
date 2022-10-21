import { APIGatewayProxyEventHeaders } from 'aws-lambda';

export const extractBearerToken = (headers: APIGatewayProxyEventHeaders): string | null => {
  if (headers.Authorization?.startsWith('Bearer')) {
    return headers.Authorization.split('Bearer ')[1];
  }

  return null;
};
