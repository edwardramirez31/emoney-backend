import Ajv, { ValidateFunction } from 'ajv';

import { crateValidator } from './create-validator';
import common from './definitions/common';
import goalSchema from './schemas/goal';

export const goalValidator = (): ValidateFunction => {
  const ajv = new Ajv({ schemas: [common], removeAdditional: true });

  return crateValidator(ajv, goalSchema);
};
