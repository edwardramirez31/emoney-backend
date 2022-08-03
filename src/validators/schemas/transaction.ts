export default {
  type: 'object',
  properties: {
    body: {
      type: 'object',
      additionalProperties: false,
      properties: {
        tenantId: {
          $ref: 'common#/definitions/tenantId'
        },
        accountId: { type: 'string', minLength: 1 },
        categoryId: { type: 'string', minLength: 1 },
        comment: { type: 'string' },
        cleared: { type: 'boolean' },
        date: { type: 'number' },
        tag: { type: 'string', minLength: 1 },
        type: { type: 'number', enum: [1, 2] },
        amount: { type: 'number' }
      },
      required: ['accountId', 'tenantId', 'categoryId', 'date', 'type', 'amount']
    }
  },
  required: ['body']
};
