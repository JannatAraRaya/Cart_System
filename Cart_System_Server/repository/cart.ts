import mongoose, { Document, Schema } from "mongoose";
import CartModel, { CartType, productItem } from "../model/carts";

class CartRepository {
  static async findCartByUserId(userId: string): Promise<CartType | null> {
    return CartModel.findOne({ user: userId });
  }

  static async addProductToCart(userId: mongoose.Types.ObjectId): Promise<CartType | null> {
    const userCart = await CartModel.findOne({ user: userId });
    return userCart;
  }
}

export default CartRepository;
