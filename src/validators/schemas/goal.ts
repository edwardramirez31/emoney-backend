export default {
  type: 'object',
  properties: {
    body: {
      type: 'object',
      additionalProperties: false,
      properties: {
        goal: {
          type: 'string',
          minLength: 1
        },
        tenantId: {
          $ref: 'common#/definitions/tenantId'
        },
        icon: { type: 'string', isTrimmed: true },
        image: { type: 'string', isTrimmed: true },
        color: { type: 'string', isTrimmed: true, pattern: '^#(?:[0-9a-fA-F]{3}){1,2}$' },
        location: { type: 'string' },
        amount: { type: 'number' }
      },
      required: ['goal', 'tenantId', 'icon', 'location', 'color', 'amount']
    }
  },
  required: ['body']
};
