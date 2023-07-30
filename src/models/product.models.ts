import { Schema, model, Model } from 'mongoose';

export interface Product {
  name: string;
  slug: string;
  description: string;
  price: number;
  quantity: number;
  categories: string;
  images: string;
  sold: number;
  rating: number;
  averageRating: number;
}

type ProductModel = Model<Product>;

const productSchema = new Schema<Product, ProductModel>(
  {
    name: { type: String, required: true },
    slug: { type: String },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    categories: { type: String },
    images: [{ type: String, required: true }],
    sold: { type: Number, default: 0 },
    rating: { type: Number, default: 0 },
    averageRating: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

// productSchema.pre('save', function (next) {
//   this.slug = slugify(this.name, { lower: true });
//   next()
// });

const ProductModel = model<Product, ProductModel>('Product', productSchema);

export default ProductModel;
