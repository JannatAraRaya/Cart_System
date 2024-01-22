import mongoose, { Document, Schema } from "mongoose";
export interface ProductType {
  _id?: string;
  title: string;
  image?: string;
  inStock: number;
  price: number;
  available?: boolean;
  rating: number;
}

// export interface ProductDocument extends ProductType, Document { }

const productSchema: Schema = new Schema<ProductType>(

  {  
    image: {
      type: String,
      required: true,
    },
    title: {
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
    rating:{
      type:Number,
      default:1
    }
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<ProductType>("Products", productSchema);
