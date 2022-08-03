import Ajv, { ValidateFunction } from 'ajv';

import { crateValidator } from './create-validator';
import common from './definitions/common';
import accountSchema from './schemas/account';

export const accountValidator = (): ValidateFunction => {
  const ajv = new Ajv({ schemas: [common], removeAdditional: true });

  return crateValidator(ajv, accountSchema);
};
