import { GatewayProxyEvent, Event } from './apiGatewayProxy.types';

export const eventBodyParser = <T>(event: Event): GatewayProxyEvent<T> => {
  try {
    return { ...event, body: event.body ? JSON.parse(event.body) : null };
  } catch (err) {
    throw { response: { status: 400, body: 'Failed to parse request body' } };
  }
};
