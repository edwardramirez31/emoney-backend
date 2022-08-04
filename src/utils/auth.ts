import { APIGatewayProxyEventHeaders } from 'aws-lambda';

export const extractBearerToken = (headers: APIGatewayProxyEventHeaders): string | null => {
  if (headers.Authorization?.includes('Bearer')) {
    return headers.Authorization.split('Bearer ')[1];
  }

  return null;
};
