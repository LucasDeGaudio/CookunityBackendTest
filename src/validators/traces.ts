import * as Joi from 'joi';
import { ValidationError } from '../errors/validation-error';
import { handleValidationErrors } from '../helpers/validations/validation-error-helper';

export const getTracesValidator = Joi.object()
  .keys({
    ip: Joi.string()
      .ip({
        version: ['ipv4', 'ipv6'],
      })
      .required(),
  })
  .error((errors) => {
    const errorName = 'getTracesValidator';
    handleValidationErrors(errors, errorName);
    throw new ValidationError(errorName);
  });
