import { Request, Response, NextFunction } from 'express';
import { HttpException, NotFoundException } from '../exceptions';

export const errorMiddleware = (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof HttpException) {
    res.status(err.statusCode).json({
      name: err.name,
      message: err.message,
      status: err.statusCode,
    });
  } else {
    res.status(500).json({
      name: 'Internal Server Error',
      message: 'Something went wrong',
    });
  }
};

export const notFound = (req: Request, res: Response, next: NextFunction) => {
  next(new NotFoundException());
};

export * from './auth.middleware';
export * from './validate.middleware';
