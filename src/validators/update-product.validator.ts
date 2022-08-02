import Ajv, { ValidateFunction } from 'ajv';

import { crateValidator } from './create-validator';
import common from './definitions/common';
import updateSchema from './schemas/update';

export const updateProductValidator = (): ValidateFunction => {
  const ajv = new Ajv({ schemas: [common], removeAdditional: true });

  return crateValidator(ajv, updateSchema);
};
