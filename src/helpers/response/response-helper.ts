import { Response } from 'express';
import { objectToSnake } from 'ts-case-convert';

export const resolveResponse = (
  res: Response,
  statusCode: number,
  response: { [key: string]: any },
) => {
  res.status(statusCode).json(objectToSnake(response));
};
