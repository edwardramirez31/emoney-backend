import { ADMIN_NO_SRP_AUTH, MFA_SETUP, NEW_PASSWORD_REQUIRED, SOFTWARE_TOKEN_MFA } from '../../constants/index';
export default {
  type: 'object',
  properties: {
    body: {
      type: 'object',
      additionalProperties: false,
      properties: {
        challengeName: {
          type: 'string',
          enum: [SOFTWARE_TOKEN_MFA, ADMIN_NO_SRP_AUTH, NEW_PASSWORD_REQUIRED, MFA_SETUP]
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
      },
      else: {
        if: {
          properties: {
            challengeName: {
              const: SOFTWARE_TOKEN_MFA
            }
          }
        },
        then: {
          properties: {
            challengeResponses: {
              type: 'object',
              properties: {
                SOFTWARE_TOKEN_MFA_CODE: {
                  type: 'string',
                  pattern: '^[0-9]{6}$'
                },
                USERNAME: {
                  type: 'string',
                  format: 'email'
                }
              },
              required: ['SOFTWARE_TOKEN_MFA_CODE', 'USERNAME']
            }
          },
          required: ['challengeResponses']
        }
      }
    }
  },
  required: ['body']
};
