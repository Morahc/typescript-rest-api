import { Request, Response, NextFunction, CookieOptions } from 'express';
import { VerifyUser, CreateUser, RefreshToken } from '../services/auth.services';
import {  generateTokens } from '../utils/jwt.utils';
import { CreateUserInput, LoginUserInput } from '../schemas/auth.schema';

const cookieOptions: CookieOptions = {
  httpOnly: true,
  sameSite: 'none',
  secure: process.env.NODE_ENV === 'production',
};

export const register = async (
  req: Request<object, object, CreateUserInput['body']>,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await CreateUser(req.body);

    return res.status(201).json(user);
  } catch (error) {
    return next(error);
  }
};

export const login = async (
  req: Request<object, object, LoginUserInput['body']>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;

    const user = await VerifyUser(email, password);

    const [accessToken, refreshToken] = generateTokens({ sub: user._id });

    res
      .cookie('x-refresh-token', refreshToken, {
        ...cookieOptions,
        maxAge: 24 * 60 * 60 * 1000,
      })
      .cookie('x-access-token', accessToken, {
        ...cookieOptions,
        maxAge: 60 * 60 * 1000,
      })
      .cookie('logged-in', true, {
        sameSite: 'none',
        secure: process.env.NODE_ENV === 'production',
      })
      .json({ accessToken });
  } catch (error) {
    next(error);
  }
};

export const refresh = async (req: Request, res: Response) => {
  const cookies = req.cookies['x-refresh-token'];

  if (!cookies) return res.status(401).json({ message: 'Unauthorized' });

  const userId = await RefreshToken(cookies);

  const [accessToken, refreshToken] = generateTokens({ sub: userId });

  res
    .cookie('x-refresh-token', refreshToken, {
      ...cookieOptions,
      maxAge: 24 * 60 * 60 * 1000,
    })
    .cookie('x-access-token', accessToken, {
      ...cookieOptions,
      maxAge: 60 * 60 * 1000,
    })
    .cookie('logged-in', true, {
      sameSite: 'none',
      secure: process.env.NODE_ENV === 'production',
    })
    .json({ accessToken });
};

export const logout = (req: Request, res: Response) => {
  res
    .status(204)
    .clearCookie('x-refresh-token')
    .clearCookie('x-access-token')
    .clearCookie('logged-in')
    .send('Logout');
};
