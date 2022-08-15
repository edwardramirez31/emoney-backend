export default {
  type: 'object',
  properties: {
    body: {
      type: 'object',
      additionalProperties: false,
      properties: {
        userAttributes: {
          type: 'object',
          properties: {
            email: {
              type: 'string',
              format: 'email'
            },
            'custom:first_name': {
              type: 'string'
            },
            'custom:last_name': {
              type: 'string'
            },
            phone_number: {
              type: 'string'
            },
            picture: {
              type: 'string'
            }
          }
        }
      },
      required: ['userAttributes']
    }
  },
  required: ['body']
};
