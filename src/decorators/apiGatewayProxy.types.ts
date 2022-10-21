import { ValidateFunction } from 'ajv';
import { Context, APIGatewayEventDefaultAuthorizerContext } from 'aws-lambda';
import { APIGatewayProxyEventBase, APIGatewayProxyResult } from 'aws-lambda/trigger/api-gateway-proxy';

export type APIGatewayEventCustomAuthorizerContext =
  | undefined
  | null
  | {
      jwt: {
        claims: {
          aud: string;
          auth_time: string;
          'cognito:username': string;
          'custom:first_name': string;
          'custom:last_name': string;
          email: string;
          email_verified: string;
          event_id: string;
          exp: string;
          iat: string;
          iss: string;
          jti: string;
          origin_jti: string;
          sub: string;
          token_use: string;
        };
        scopes: string[] | null;
      };
    };

export type Event = APIGatewayProxyEventBase<APIGatewayEventDefaultAuthorizerContext>;

export type GatewayProxyEvent<T> = Omit<Event, 'body'> & { body: T | null };

export interface ApiGwProxyParams<T> {
  handler: (event: GatewayProxyEvent<T>, context: Context) => Promise<APIGatewayProxyResult>;
  validator?: ValidateFunction;
}
