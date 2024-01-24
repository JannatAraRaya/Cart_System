import mongoose, { Document, Schema } from "mongoose";

export interface productItem {
  product: mongoose.Types.ObjectId | any;
  quantity: number;
}

export interface TransactionType extends Document {
  transid: string;
  cart: mongoose.Types.ObjectId;
  user: mongoose.Types.ObjectId;
  products: productItem[];
  total: number;
  discountPercentage: number;
}

const transactionSchema: Schema<TransactionType> = new Schema(
  {
    transid: {
      type: String,
      required: true,
    },
    cart: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "carts",
      required: true,
    },
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
    total: Number,
  },
  { timestamps: true }
);

export default mongoose.model<TransactionType>(
  "transactions",
  transactionSchema
);
