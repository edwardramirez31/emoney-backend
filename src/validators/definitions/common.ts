export default {
  $id: 'common',
  definitions: {
    tenantId: {
      type: 'string',
      minLength: 1
    },
    sessionId: {
      type: 'string',
      minLength: 1
    },
    text: {
      type: 'string',
      isTrimmed: true,
      minLength: 1
    },
    price: {
      type: 'number',
      minimum: 0
    }
  }
};
