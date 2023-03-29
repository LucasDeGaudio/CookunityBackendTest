import _ from 'lodash';

export function camelCaseToSnakeCase(obj) {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  const result = {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const snakeCaseKey = _.snakeCase(key);
      result[snakeCaseKey] = camelCaseToSnakeCase(obj[key]);
    }
  }
  return result;
}
