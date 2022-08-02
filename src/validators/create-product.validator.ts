import Ajv, { ValidateFunction } from 'ajv';

import { crateValidator } from './create-validator';
import common from './definitions/common';
import createSchema from './schemas/create';

export const createProductValidator = (): ValidateFunction => {
  const ajv = new Ajv({ schemas: [common], removeAdditional: true });

  return crateValidator(ajv, createSchema);
};
