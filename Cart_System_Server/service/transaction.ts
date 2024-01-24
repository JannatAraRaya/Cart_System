import mongoose, { Document, Schema } from "mongoose";
import CartModel from "../model/carts";
import transactionRepository from "../repository/transaction";
import ProductModel from "../model/product";
import TransactionModel from "../model/transaction";
import TransactionRepository from "../repository/transaction";
import IResponse from "../util/responseInterface";



class TransactionService {
    async checkOut(cartId: mongoose.Types.ObjectId, userId: mongoose.Types.ObjectId, transid:string): Promise<any> {
        try {
          const cart = await CartModel.findOne({ _id: cartId, user: userId }).populate("products");
          console.log(cart);
    
          if (!cart || cart.products.length === 0) {
            return {
              success:false,
              message:"Cart is empty or not found.",
          }
        }
    
          let total = 0;
          const transactionItems: any[] = [];
    
          for (const item of cart.products) {
            const { product: productId, quantity } = item;
            const product = await ProductModel.findById(productId);
    
            if (!product) {
              return {
                success:false,
                message:`Product with ID ${productId} not found.`,
            }
            }
    
            if (product.inStock < quantity) {
              return {
                success:false,
                message:`Product ${product.title} is out of stock.`,
            }
            }
    
            total += product.price * quantity;
            transactionItems.push({ product: productId, quantity });
          }
    
          await this.updateStock(transactionItems);
          const transaction = await TransactionRepository.createTransaction(cart._id, userId, transactionItems, total,transid);
    
          
          cart.products = [];
          cart.Total=0;
          await cart.save();    
          return { transaction };
        } catch (error) {
          console.error(error);
          throw new Error("Checkout failed.");
        }
      }


    
      private async updateStock(items: any[]): Promise<void> {
        try {
          for (const item of items) {
            const { product: productId, quantity } = item;
            const product = await ProductModel.findById(productId);
    
            if (product) {
              product.inStock -= quantity;
              await product.save();
            }
          }
        } catch (error) {
          console.error("Error updating stock:", error);
          throw new Error("Failed to update stock.");
          
        }
      }


}

export default new TransactionService();

