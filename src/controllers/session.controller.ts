import { Request, Response, NextFunction } from 'express';
import { VerifyUser, CreateUser } from '../services/auth.services';
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

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;

    const user = await VerifyUser(email, password);

    req.session.user = user._id;

    res.json({ user });
  } catch (error) {
    next(error);
  }
};

export const logout = async (req: Request, res: Response) => {
  req.session.destroy((err) => {
    if (err) res.status(500).json({ message: err || 'Something went wrong' });
  });
  res.status(200).send('session deleted');
};
