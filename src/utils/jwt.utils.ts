import { Types } from 'mongoose';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

interface payload {
  sub: Types.ObjectId;
}

const secrets = {
  accessToken: process.env.JWT_SECRET_ACCESS as string,
  refreshToken: process.env.JWT_SECRET_REFRESH as string,
};

export const generateTokens = (payload: payload) => {
  const accessToken = jwt.sign(payload, secrets['accessToken'], { expiresIn: '15m' });
  const refreshToken = jwt.sign(payload, secrets['refreshToken'], { expiresIn: '3d' });

  return [accessToken, refreshToken];
};

export const verifyToken = (token: string, key: 'accessToken' | 'refreshToken') => {
  try {
    return jwt.verify(token, secrets[key]);
  } catch {
    return null;
  }
};
