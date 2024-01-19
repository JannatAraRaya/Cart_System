import mongoose, { Document, Schema } from "mongoose";

export interface ProductType {
  image?: string;
  name: string;
  price: number;
  inStock: number;
  available?: boolean;
}

// export interface ProductDocument extends ProductType, Document {}

const productSchema: Schema = new Schema<ProductType>(
  {
    image: {
      type: String,
    },
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      default: 0,
      required: true,
    },
    inStock: {
      type: Number,
      default: 0,
    },
    available: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<ProductType>("Products", productSchema);
