import Ajv, { ValidateFunction } from 'ajv';

import { crateValidator } from './create-validator';
import common from './definitions/common';
import logoutSchema from './schemas/logout';

export const logoutValidator = (): ValidateFunction => {
  const ajv = new Ajv({ schemas: [common], removeAdditional: true });

  return crateValidator(ajv, logoutSchema);
};
