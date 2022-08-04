export default {
  type: 'object',
  properties: {
    body: {
      type: 'object',
      additionalProperties: false,
      properties: {
        name: {
          type: 'string',
          minLength: 1
        },
        icon: { type: 'string' },
        type: { type: 'number', enum: [1, 2] },
        color: { type: 'string', isTrimmed: true, pattern: '^#(?:[0-9a-fA-F]{3}){1,2}$' },
        budget: { type: 'number' }
      },
      required: ['name', 'icon', 'type', 'color', 'balance']
    }
  },
  required: ['body']
};
