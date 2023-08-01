import { object, string, TypeOf } from 'zod';

export const loginUserSchema = object({
  body: object({
    password: string({
      required_error: 'Password is required',
    }).min(8, 'Password too short - should be 8 chars minimum'),

    email: string({
      required_error: 'Email is required',
    }).email('Not a valid email'),
  }),
});

export const createUserSchema = object({
  body: object({
    fullname: string({
      required_error: 'Name is required',
    }),
    password: string({
      required_error: 'Password is required',
    }).min(8, 'Password too short - should be 8 characters minimum'),
    passwordConfirmation: string({
      required_error: 'Password Confirmation is required',
    }),
    email: string({
      required_error: 'Email is required',
    }).email('Not a valid email'),
  }).refine(({ password, passwordConfirmation }) => password === passwordConfirmation, {
    message: 'Passwords do not match',
    path: ['passwordConfirmation'],
  }),
});

export const forgotPasswordSchema = object({
  body: object({
    email: string({
      required_error: 'Email is required',
    }).email('Email is invalid'),
  }),
});

export type CreateUserInput = TypeOf<typeof createUserSchema>;

export type LoginUserInput = TypeOf<typeof loginUserSchema>;

export type ForgotPasswordInput = TypeOf<typeof forgotPasswordSchema>['body'];
