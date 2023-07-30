import { Router } from 'express';
import { validate } from '../middleware';
// import { login, logout, register } from '../controllers/session.controller';
import { login, logout, register } from '../controllers/stateless.controller';
import { loginUserSchema, createUserSchema } from '../schemas/auth.schema';

const router = Router();

router.post('/register', validate(createUserSchema), register);

router.post('/login', validate(loginUserSchema), login);

router.delete('/logout', logout);

export default router;
