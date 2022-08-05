import { ADMIN_NO_SRP_AUTH, MFA_SETUP, NEW_PASSWORD_REQUIRED, SMS_MFA } from '../../constants/index';
export default {
  type: 'object',
  properties: {
    body: {
      type: 'object',
      additionalProperties: false,
      properties: {
        challengeName: {
          type: 'string',
          enum: [SMS_MFA, ADMIN_NO_SRP_AUTH, NEW_PASSWORD_REQUIRED, MFA_SETUP]
        },
        session: {
          type: 'string'
        },
        challengeResponses: {
          type: 'object',
          properties: {
            NEW_PASSWORD: {
              type: 'string',
              minLength: 8
            },
            USERNAME: {
              type: 'string',
              format: 'email'
            },
            PASSWORD: {
              type: 'string',
              minLength: 8
            },
            SMS_MFA_CODE: {
              type: 'string',
              minLength: 8
            }
          }
        }
      },
      required: ['challengeResponses', 'challengeName'],
      if: {
        properties: {
          challengeName: {
            const: NEW_PASSWORD_REQUIRED
          }
        }
      },
      then: {
        oneOf: [
          {
            properties: {
              challengeResponses: {
                type: 'object',
                properties: {
                  NEW_PASSWORD: {
                    type: 'string',
                    minLength: 8
                  },
                  USERNAME: {
                    type: 'string',
                    format: 'email'
                  }
                },
                required: ['NEW_PASSWORD', 'USERNAME']
              }
            },
            required: ['challengeResponses']
          }
        ]
      }
    }
  },
  required: ['body']
};
