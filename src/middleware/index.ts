import { Request, Response, NextFunction } from 'express';
import HttpException from '../utils/HttpException.utils';

export interface HttpError extends Error {
  status?: number;
}

export const errorMiddleware = (
  err: HttpError,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
) => {
  console.log(err);
  const status = err.status || 500;
  const message = err.message || 'Something went wrong!';
  res.status(status).json({
    message: message,
    stack: process.env.NODE_ENV === 'prod' ? null : err.stack,
  });
};

export const notFound = (req: Request, res: Response, next: NextFunction) => {
  next(new HttpException(404, `Route ${req.originalUrl} not found`));
};

export * from './auth.middleware';
export * from './validate.middleware';
