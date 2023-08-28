import { Response, Request, NextFunction } from 'express';
import { ResetPasswordInput } from '../schemas/user.schema';
import { Profile, ResetPassword, VerifyAccount, DeleteAccount } from '../services/user.services';

// export const userProfile = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const profile = await Profile(req.user);

//     return res.status(201).json(profile);
//   } catch (error) {
//     return next(error);
//   }
// };

// export const resetPassword = async (
//   req: Request<ResetPasswordInput['params'], object, ResetPasswordInput['body']>,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     await ResetPassword(req.user, req.body.password);

//     return res.status(201).send('Password reset sucessful');
//   } catch (error) {
//     return next(error);
//   }
// };

// export const verifyAccount = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     await VerifyAccount(req.user);

//     return res.status(201).send('User verified');
//   } catch (error) {
//     return next(error);
//   }
// };

// export const deleteAccount = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     await DeleteAccount(req.user);

//     return res.status(201).send('User deleted');
//   } catch (error) {
//     return next(error);
//   }
// };
