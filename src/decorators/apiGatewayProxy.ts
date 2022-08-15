import { APIGatewayProxyHandler, Context, APIGatewayProxyResult } from 'aws-lambda';
import { responseGenerator } from 'src/utils/responseGenerator';

import { handleValidation } from './../validators/handleValidation';
import { ApiGwProxyParams, Event } from './apiGatewayProxy.types';
import { eventBodyParser } from './apiGatewayProxy.utils';

export const apiGwProxy =
  <TEventBody = null>({ handler, validator }: ApiGwProxyParams<TEventBody>): APIGatewayProxyHandler =>
  async (event: Event, context: Context): Promise<APIGatewayProxyResult> => {
    try {
      const mqGatewayProxyEvent = eventBodyParser<TEventBody>(event);

      const result = await (validator
        ? handleValidation(mqGatewayProxyEvent, context, validator, handler)
        : handler(mqGatewayProxyEvent, context));

      return result;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(JSON.stringify(error));

      return responseGenerator({
        statusCode: error?.response?.status || error?.statusCode || 500,
        body: error?.response?.body || { errorMessage: error?.message || 'Something went wrong', code: error?.code || 'Unknown' }
      });
    }
  };
