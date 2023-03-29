import { Response } from 'express';
import { camelCaseToSnakeCase } from './camel-to-snake-case-helper';

export const resolveResponse = (
  res: Response,
  statusCode: number,
  response: { [key: string]: any },
) => {
  res.status(statusCode).json(camelCaseToSnakeCase(response));
};
