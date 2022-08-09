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
        confirmationCode: {
          type: 'string',
          pattern: '^[0-9]{6}$'
        },
        password: {
          type: 'string',
          minLength: 8
        }
      },
      required: ['email', 'confirmationCode', 'password']
    }
  },
  required: ['body']
};
