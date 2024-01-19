import { Schema, model, connect, Mongoose } from "mongoose";
// const mongoose = require("mongoose");

interface ProductType {
    image?: string;
    name: string;
    price: number;
    inStock: number;
    available?: boolean;
}
const productSchema = new Schema<ProductType>({
    image: {
        type: String,
    },
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        default: 0,
        require: true,
    },
    inStock:{
        type: Number,
         default: 0 
    },
    available: { 
        type: Boolean, 
        default: true 
    },
}, {
    timestamps: true,
  }


);

const Product = model<ProductType>("Products", productSchema);
