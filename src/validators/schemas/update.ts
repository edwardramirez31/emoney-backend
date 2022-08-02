export default {
  type: 'object',
  properties: {
    body: {
      type: 'object',
      additionalProperties: false,
      properties: {
        text: {
          $ref: 'common#/definitions/text'
        },
        price: {
          $ref: 'common#/definitions/price'
        },
        picture: { type: 'string', isTrimmed: true }
      },
      required: ['text', 'price']
    }
  },
  required: ['body']
};
