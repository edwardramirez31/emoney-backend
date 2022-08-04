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
        },
        password: { type: 'string', minLength: 8 }
      },
      required: ['email', 'password']
    }
  },
  required: ['body']
};
