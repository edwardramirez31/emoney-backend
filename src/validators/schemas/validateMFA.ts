export default {
  type: 'object',
  properties: {
    body: {
      type: 'object',
      additionalProperties: false,
      properties: {
        accessToken: { type: 'string', pattern: '[A-Za-z0-9-_=.]+' },
        code: { type: 'string', minLength: 6, maxLength: 6 }
      },
      required: ['accessToken', 'code']
    }
  },
  required: ['body']
};
