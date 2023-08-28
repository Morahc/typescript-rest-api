import { Router } from 'express';
import { validate } from '../middleware';
import { login, logout, register } from '../controllers/session.controller';
// import { login, logout, register } from '../controllers/stateless.controller';
import { loginUserSchema, createUserSchema } from '../schemas/auth.schema';
import passport from '../config/passport';

const router = Router();

router.post('/register', validate(createUserSchema), register);

router.post(
  '/login',
  validate(loginUserSchema),
  passport.authenticate('local', { failureRedirect: '/login' }),
  login
);

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get(
  '/google/redirect',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    res.send('Google ok');
  }
);

router.get('/github', passport.authenticate('github'));

router.get(
  '/github/redirect',
  passport.authenticate('github', { failureRedirect: '/login' }),
  (req, res) => {
    res.send('Github Ok');
  }
);

router.post('/logout', logout);

export default router;
