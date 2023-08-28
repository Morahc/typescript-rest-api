// import { FilterQuery, Types } from 'mongoose';
import ProductModel from '../models/product.models';
import { slugify } from '../utils/slugify.utils';
import { CreateProductInput, UpdateProductInput } from '../schemas/product.schema';
import { BadRequestException, NotFoundException } from '../exceptions';

export const GetProducts = async (query?: string) => {
  const products = await ProductModel.find({ query });

  return products;
};

export const GetProduct = async (id: string) => {
  const product = await ProductModel.findById(id);

  if (!product) throw new NotFoundException('Item with identifier not found');

  return product;
};

export const CreateProduct = async (input: CreateProductInput['body']) => {
  const slug = slugify(input.name);

  const slugExist = await ProductModel.exists({ slug });

  if (slugExist) throw new BadRequestException('Item with slug name already exists');

  await ProductModel.create({ ...input, slug });
};

export const UpdateProduct = async (id: string, input: UpdateProductInput['body']) => {
  try {
    await ProductModel.findByIdAndUpdate(id, input);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error.name == 'CastError') throw new NotFoundException('Item with identifier not found');

    throw new BadRequestException(error.message);
  }
};

export const DeleteProduct = async (id: string) => {
  try {
    await ProductModel.findByIdAndDelete(id);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error.name == 'CastError')
      throw new NotFoundException('Item with identifier not found');

    throw new BadRequestException(error.message);
  }
};
