import { object, string, TypeOf } from 'zod';

export const resetPasswordSchema = object({
  params: object({
    resetToken: string().optional(),
  }),
  body: object({
    password: string({
      required_error: 'Password is required',
    }).min(8, 'Password must be more than 8 characters'),
    passwordConfirmation: string({
      required_error: 'Please confirm your password',
    }),
  }).refine((data) => data.password === data.passwordConfirmation, {
    message: 'Passwords do not match',
    path: ['passwordConfirm'],
  }),
});

export const updateUserSchema = object({
  body: object({
    email: string().email('Not a valid email').optional(),
    fullname: string().optional(),
  }),
});

export type updateUserInput = TypeOf<typeof updateUserSchema>;

export type ResetPasswordInput = TypeOf<typeof resetPasswordSchema>;
