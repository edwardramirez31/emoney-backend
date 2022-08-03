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
        tenantId: {
          $ref: 'common#/definitions/tenantId'
        },
        cleared: { type: 'number' },
        balance: { type: 'number' },
        goal: { type: 'number' },
        icon: { type: 'string' },
        color: { type: 'string', isTrimmed: true, pattern: '^#(?:[0-9a-fA-F]{3}){1,2}$' }
      },
      required: ['name', 'tenantId', 'icon', 'color']
    }
  },
  required: ['body']
};
