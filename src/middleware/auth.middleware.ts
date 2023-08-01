import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt.utils';
import UserModel from '../models/user.model';

export const deserializeUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let accessToken;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      accessToken = req.headers.authorization.split(' ')[1];
    } else if (req.cookies['x-access-token']) {
      accessToken = req.cookies['x-access-token'];
    }

    if (!accessToken) return next();

    const decoded = verifyToken(accessToken, 'accessToken');

    if (!decoded) return next();

    const user = await UserModel.findById(decoded.sub);

    if (!user) return next();

    req.user = user._id;

    next();
  } catch (err: unknown) {
    next(err);
  }
};

export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) {
    return res.status(403).send('Unauthorized Access');
  }
  return next();
};
