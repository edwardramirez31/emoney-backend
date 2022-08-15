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
        password: { type: 'string', minLength: 8 },
        first_name: {
          type: 'string'
        },
        last_name: {
          type: 'string'
        }
      },
      required: ['email', 'password', 'first_name', 'last_name']
    }
  },
  required: ['body']
};
