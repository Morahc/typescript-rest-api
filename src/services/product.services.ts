// import { FilterQuery, Types } from 'mongoose';
import ProductModel from '../models/product.models';
import HttpException from '../utils/HttpException.utils';
import { slugify } from '../utils/slugify.utils';
import { CreateProductInput, UpdateProductInput } from '../schemas/product.schema';

export const GetProducts = async (query?: string) => {
  const products = await ProductModel.find({ query });

  return products;
};

export const GetProduct = async (id: string) => {
  const product = await ProductModel.findById(id).catch((error) => {
    if (error.name === 'CastError')
      throw new HttpException(404, 'Invalid Item identifier', 'Not Found');
  });

  if (!product) throw new HttpException(404, 'Item with identifier not found', 'Not Found');

  return product;
};

export const CreateProduct = async (input: CreateProductInput['body']) => {
  const slug = slugify(input.name);

  const slugExist = await ProductModel.exists({ slug });

  if (slugExist)
    throw new HttpException(401, 'Item with slug name already exists', 'Duplicate Found');

  await ProductModel.create({ ...input, slug });
};

export const UpdateProduct = async (id: string, input: UpdateProductInput['body']) => {
  try {
    await ProductModel.findByIdAndUpdate(id, input);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error.name == 'CastError')
      throw new HttpException(404, 'Item with identifier not found', 'Not Found');

    throw new HttpException(404, error.message);
  }
};

export const DeleteProduct = async (id: string) => {
  try {
    await ProductModel.findByIdAndDelete(id);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error.name == 'CastError')
      throw new HttpException(404, 'Item with identifier not found', 'Not Found');

    throw new HttpException(404, error.message);
  }
};
