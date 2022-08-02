import { ValidateFunction } from 'ajv';
import { APIGatewayEventDefaultAuthorizerContext, Context } from 'aws-lambda';
import { APIGatewayProxyEventBase, APIGatewayProxyResult } from 'aws-lambda/trigger/api-gateway-proxy';

export type Event = APIGatewayProxyEventBase<APIGatewayEventDefaultAuthorizerContext>;

export type GatewayProxyEvent<T> = Omit<Event, 'body'> & { body: T | null };

export interface ApiGwProxyParams<T> {
  handler: (event: GatewayProxyEvent<T>, context: Context) => Promise<APIGatewayProxyResult>;
  validator?: () => ValidateFunction;
}
