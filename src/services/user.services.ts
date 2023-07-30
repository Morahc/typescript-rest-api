import { Types } from 'mongoose';
import UserModel from '../models/user.model';
import HttpException from '../utils/HttpException.utils';

export const FindUserById = async (id: Types.ObjectId) => {
  const user = await UserModel.findById(id);

  if (!user) {
    throw new HttpException(401, 'User not found');
  }

  return user;
};

export const Profile = async (id: Types.ObjectId) => {
  const user = await FindUserById(id);

  return user.profile();
};

export const UpdateInfo = async (id: Types.ObjectId) => {
  return;
};

export const ResetPassword = async (id: Types.ObjectId, password: string) => {
  const user = await FindUserById(id);

  user.password = password;
  user.save();
};

export const VerifyAccount = async (id: Types.ObjectId): Promise<void> => {
  const user = await FindUserById(id);

  user.verifyAccount();
};

export const DeleteAccount = async (id: Types.ObjectId): Promise<void> => {
  const user = await FindUserById(id);

  user.deleteAccount();
};
