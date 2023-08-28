import { Router } from 'express';
import authRoutes from './auth.route';
// import userRoutes from './user.route';
import productRoutes from './product.route';

const router = Router();

router.use('/auth', authRoutes);
// router.use('/user', userRoutes);
router.use('/products', productRoutes);

export default router;
