import * as Joi from 'joi';
import { ValidationError } from '../errors/validation-error';
import { handleValidationErrors } from '../helpers/validations/validation-error-helper';

export const getStatisticsValidator = Joi.object()
  .keys({})
  .error((errors) => {
    const errorName = 'getStatisticsValidator';
    handleValidationErrors(errors, errorName);
    throw new ValidationError(errorName);
  });
