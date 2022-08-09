export default {
  type: 'object',
  properties: {
    body: {
      type: 'object',
      additionalProperties: false,
      properties: {
        accessToken: { type: 'string', pattern: '[A-Za-z0-9-_=.]+' }
      },
      required: ['accessToken']
    }
  },
  required: ['body']
};
