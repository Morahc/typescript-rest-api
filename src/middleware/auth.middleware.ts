import { Request, Response, NextFunction } from 'express';
import HttpException from '../utils/HttpException.utils';
import { verifyToken } from '../utils/jwt.utils';
import UserModel from '../models/user.model';

export const deserializeUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let access_token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      access_token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies['x-access-token']) {
      access_token = req.cookies['x-access-token'];
    }

    if (!access_token) {
      return next(new HttpException(401, 'You are not logged in'));
    }

    const decoded = verifyToken(access_token, 'accessToken');

    if (!decoded) return next(new HttpException(401, "Invalid token or user doesn't exist"));

    const user = await UserModel.findById(decoded.sub);

    if (!user) {
      return next(new HttpException(401, 'User with that token no longer exist'));
    }

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
