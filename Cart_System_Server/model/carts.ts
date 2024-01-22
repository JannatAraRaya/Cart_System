import mongoose, { Document, Schema } from "mongoose";

export interface productItem {
  product: mongoose.Types.ObjectId;
  quantity: number;
}

export interface CartType extends Document {
  user: mongoose.Types.ObjectId;
  products: productItem[];
  Total: number;
}

const cartSchema: Schema<CartType> = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    products: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "products",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
    Total: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.model<CartType>("carts", cartSchema);