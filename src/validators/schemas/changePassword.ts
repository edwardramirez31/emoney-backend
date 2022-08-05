export default {
  type: 'object',
  properties: {
    body: {
      type: 'object',
      additionalProperties: false,
      properties: {
        previousPassword: { type: 'string', minLength: 8 },
        proposedPassword: { type: 'string', minLength: 8 },
        accessToken: { type: 'string', pattern: '[A-Za-z0-9-_=.]+' }
      },
      required: ['previousPassword', 'proposedPassword', 'accessToken']
    }
  },
  required: ['body']
};
