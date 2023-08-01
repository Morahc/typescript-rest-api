import { Router } from 'express';
import { validate } from '../middleware';
import {
  getAllProducts,
  getSingleProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/product.controller';
import { productCreateSchema, productUpdateSchema } from '../schemas/product.schema';

const router = Router();

router.get('/', getAllProducts);

router.get('/:id', getSingleProduct);

router.post('/', validate(productCreateSchema), createProduct);

router.patch('/:id', validate(productUpdateSchema), updateProduct);

router.delete('/', deleteProduct);

export default router;
