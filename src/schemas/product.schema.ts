import { number, object, string, TypeOf } from 'zod';

export const productCreateSchema = object({
  body: object({
    name: string(),
    description: string(),
    brand: string(),
    price: number().min(1),
    quantity: number().min(1),
    category: string(),
    attributes: object({}).optional(),
  }),
});

export const productUpdateSchema = object({
  params: object({
    id: string(),
  }),
  body: object({
    name: string(),
    slug: string(),
    description: string(),
    brand: string(),
    price: number().min(1),
    quantity: number().min(1),
    category: string(),
    attributes: object({}),
  }).partial(),
});

export type CreateProductInput = TypeOf<typeof productCreateSchema>;

export type UpdateProductInput = TypeOf<typeof productUpdateSchema>;
