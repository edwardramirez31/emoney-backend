import Ajv, { Schema, ValidateFunction } from 'ajv';
import addFormats from 'ajv-formats';

export const crateValidator = (ajv: Ajv, schema: Schema): ValidateFunction => {
  addFormats(ajv, ['date', 'email']);
  ajv.addKeyword({
    keyword: 'isTrimmed',
    validate: (isTrimmed: boolean, value: unknown) =>
      !isTrimmed || (isTrimmed && ((typeof value === 'string' && value === value.trim()) || typeof value !== 'string')),
    errors: true
  });

  return ajv.compile(schema);
};
