import mongoose from "mongoose";
import CartRepository from "../repository/cart";
import CartModel, { CartType } from "../model/carts";
import ProductModel, { ProductType } from "../model/product";
import IResponse from "../util/responseInterface";

class CartService {

  static async createProduct(
    userId: mongoose.Types.ObjectId,
    productId: mongoose.Types.ObjectId,
    quantity: number
  ): Promise<IResponse> {
    try {
      let userCart = await CartRepository.addProductToCart(userId);
  
      if (!userCart) {
        userCart = new CartModel({
          user: userId,
          products: [],
          Total: 0,
        });
      }
  
      const product = await ProductModel.findById(productId);
  
      if (!product) {
        throw new Error("Product not found");
      }
  
      const existingProductIndex = userCart.products.findIndex(
        (item) => item.product.toString() === productId.toString()
      );
  
      if (existingProductIndex === -1) {
        userCart.products.push({
          product: productId,
          quantity: quantity,
        });
      } else {
        userCart.products[existingProductIndex].quantity += quantity;
      }
  
      userCart.Total = userCart.products.reduce((total, item) => {
        const productPrice = item.quantity * product.price;
        return total + productPrice;
      }, 0);
  
      await userCart.save();
  
      return {
        success: true,
        data: userCart,
      };
    } catch (error) {
      console.error(error);
      return {
        success: false,
        error: "Error creating product in the cart",
      };
    }
  }
}

export default CartService;
