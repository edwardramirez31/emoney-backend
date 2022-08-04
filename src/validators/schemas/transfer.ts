export default {
  type: 'object',
  properties: {
    body: {
      type: 'object',
      additionalProperties: false,
      properties: {
        sender: { type: 'string', minLength: 1 },
        receiver: { type: 'string', minLength: 1 },
        comment: { type: 'string' },
        date: { type: 'number' },
        amount: { type: 'number' }
      },
      required: ['sender', 'receiver', 'date', 'amount']
    }
  },
  required: ['body']
};
