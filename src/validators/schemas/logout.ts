export default {
  type: 'object',
  properties: {
    body: {
      type: 'object',
      additionalProperties: false,
      properties: {
        refreshToken: { type: 'string', pattern: '[A-Za-z0-9-_=.]+' }
      },
      required: ['refreshToken']
    }
  },
  required: ['body']
};
