export default {
  type: 'object',
  properties: {
    body: {
      type: 'object',
      additionalProperties: false,
      properties: {
        email: {
          type: 'string',
          format: 'email'
        }
      },
      required: ['email']
    }
  },
  required: ['body']
};
