import { APIGatewayProxyHandler, Context, APIGatewayProxyResult } from 'aws-lambda';

import { handleValidation } from './../validators/handleValidation';
import { ApiGwProxyParams, Event } from './apiGatewayProxy.types';
import { eventBodyParser } from './apiGatewayProxy.utils';

export const apiGwProxy =
  <TEventBody = null>({ handler, validator }: ApiGwProxyParams<TEventBody>): APIGatewayProxyHandler =>
  async (event: Event, context: Context): Promise<APIGatewayProxyResult> => {
    try {
      const mqGatewayProxyEvent = eventBodyParser<TEventBody>(event);

      const result = await (validator
        ? handleValidation(mqGatewayProxyEvent, context, validator(), handler)
        : handler(mqGatewayProxyEvent, context));

      return result;
    } catch (error) {
      return {
        statusCode: error?.response?.status || 500,
        body: JSON.stringify(error?.response?.body || error?.message || 'Something went wrong')
      };
    }
  };
