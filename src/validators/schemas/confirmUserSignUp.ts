export default {
  type: 'object',
  properties: {
    body: {
      type: 'object',
      additionalProperties: false,
      properties: {
        confirmationCode: {
          type: 'string',
          minLength: 1
        },
        email: {
          type: 'string',
          format: 'email'
        }
      },
      required: ['confirmationCode', 'email']
    }
  },
  required: ['body']
};
