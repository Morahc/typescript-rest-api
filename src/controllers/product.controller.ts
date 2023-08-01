import { Response, Request, NextFunction } from 'express';
import {
  GetProducts,
  GetProduct,
  CreateProduct,
  UpdateProduct,
  DeleteProduct,
} from '../services/product.services';
import { CreateProductInput, UpdateProductInput } from '../schemas/product.schema';

export const getAllProducts = async (req: Request, res: Response) => {
  const products = await GetProducts();

  return res.json({ data: products });
};

export const getSingleProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const product = await GetProduct(req.params.id);

    return res.json({ data: product });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error.name === 'CastError') {
      error.message = 'Item with ';
    }
    next(error);
  }
};

export const createProduct = async (
  req: Request<object, object, CreateProductInput['body']>,
  res: Response,
  next: NextFunction
) => {
  try {
    await CreateProduct(req.body);

    return res.json({ succes: true, message: 'Product Successfully Created' });
  } catch (error) {
    next(error);
  }
  return;
};

export const updateProduct = async (
  req: Request<UpdateProductInput['params'], object, UpdateProductInput['body']>,
  res: Response,
  next: NextFunction
) => {
  try {
    await UpdateProduct(req.params.id, req.body);

    return res.json({ succes: true, message: 'Product Successfully Updated' });
  } catch (error) {
    next(error);
  }
};

export const deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await DeleteProduct(req.params.id);

    return res.json({ succes: true, message: 'Product Successfully Deleted' });
  } catch (error) {
    next(error);
  }
};
