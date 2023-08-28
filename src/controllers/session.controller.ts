import { Request, Response, NextFunction } from 'express';
import { CreateUser } from '../services/auth.services';
import { CreateUserInput } from '../schemas/auth.schema';

export const register = async (
  req: Request<object, object, CreateUserInput['body']>,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const user = await CreateUser(req.body);

    return res.status(201).json(user);
  } catch (error) {
    return next(error);
  }
};

export const login = (req: Request, res: Response) => {
  res.send('Login Ok');
};

export const logout = (req: Request, res: Response, next: NextFunction) => {
  req.logOut((err) => {
    if (err) return next(err);

    res.status(200).send('Logout');
  });
};
