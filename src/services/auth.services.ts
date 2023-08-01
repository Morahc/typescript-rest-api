import UserModel from '../models/user.model';
import { CreateUserInput } from '../schemas/auth.schema';
import HttpException from '../utils/HttpException.utils';
import { verifyToken } from '../utils/jwt.utils';

export const FindUser = async (email: string) => {
  const user = await UserModel.findOne({ email });

  if (user) {
    return user;
  }

  return false;
};

export const VerifyUser = async (email: string, password: string) => {
  const user = await FindUser(email);

  if (!user || !(await user.matchPassword(password))) {
    throw new HttpException(401, 'Invalid email or password');
  }

  return user;
};

export const CreateUser = async (input: CreateUserInput['body']) => {
  const emailExists = await FindUser(input.email);

  if (emailExists) {
    throw new HttpException(404, 'Email already exists');
  }

  return await UserModel.create(input);
};

export const ForgetPassword = () => {
  return;
};

export const RefreshToken = async (refreshToken: string) => {
  const decoded = verifyToken(refreshToken, 'refreshToken');

  if (!decoded) throw new HttpException(403, 'Unauthorized Access');

  const user = await UserModel.findById(decoded.sub);

  if (!user) throw new HttpException(403, 'Unauthorized User');

  return user._id;
};
