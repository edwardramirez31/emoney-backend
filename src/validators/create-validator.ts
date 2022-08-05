import Ajv, { Schema, ValidateFunction } from 'ajv';
import addFormats from 'ajv-formats';

import common from './definitions/common';

export const crateValidator = (schema: Schema): ValidateFunction => {
  const ajv = new Ajv({ schemas: [common], removeAdditional: true });
  addFormats(ajv, ['date', 'email']);
  ajv.addKeyword({
    keyword: 'isTrimmed',
    validate: (isTrimmed: boolean, value: unknown) =>
      !isTrimmed || (isTrimmed && ((typeof value === 'string' && value === value.trim()) || typeof value !== 'string')),
    errors: true
  });

  return ajv.compile(schema);
};
