import { Schema, model, Model } from 'mongoose';

// const reviewSchema = new Schema(
//   {
//     user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
//     name: { type: String, required: true },
//     rating: { type: Number, default: 0 },
//     comment: { type: String, required: true },
//   },
//   {
//     timestamps: true,
//   }
// );

export interface Product {
  name: string;
  slug: string;
  description: string;
  brand: string;
  price: number;
  quantity: number;
  categories: string;
  attributes: Record<string, string[]>;
  images: string;
}

type ProductModel = Model<Product>;

const productSchema = new Schema<Product, ProductModel>(
  {
    name: { type: String, required: true },
    slug: { type: String, unique: true },
    description: { type: String, required: true },
    brand: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    categories: { type: String },
    attributes: { type: Map, of: [String] },
    images: [{ type: String, required: true }],
  },
  {
    timestamps: true,
  }
);

const ProductModel = model<Product, ProductModel>('Product', productSchema);

export default ProductModel;
