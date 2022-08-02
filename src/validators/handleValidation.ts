import { APIGatewayProxyResult, Context } from 'aws-lambda';
import { ValidateFunction } from 'ajv';

import { GatewayProxyEvent } from './../decorators/apiGatewayProxy.types';

export const handleValidation = async <T>(
  event: GatewayProxyEvent<T>,
  context: Context,
  validator: ValidateFunction,
  responseFn: (event: GatewayProxyEvent<T>, context: Context) => Promise<APIGatewayProxyResult>
): Promise<APIGatewayProxyResult> => {
  if (validator(event)) {
    return await responseFn(event, context);
  }

  // eslint-disable-next-line no-console
  console.error({ error: validator.errors }, 'Validation problems');

  throw { response: { status: 400, body: validator.errors } };
};
