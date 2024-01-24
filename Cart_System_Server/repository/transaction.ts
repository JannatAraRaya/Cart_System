import mongoose, { Document, Schema } from "mongoose";
import CartModel, { CartType } from "../model/carts";
import TransactionModel, { TransactionType } from "../model/transaction";

class TransactionRepository {
    static async createTransaction(
        cartId: mongoose.Types.ObjectId,
        userId: mongoose.Types.ObjectId,
        products: any[],
        total: number,
        transid:string
      ): Promise<TransactionType> {
        const isCartMatched = await CartModel.exists({
          _id: cartId,
          user: userId,
        });
    
        if (!isCartMatched) {
          throw new Error("Provided cart_id does not match the user_id.");
        }
    
        const transaction = new TransactionModel({
          transid,
          cart: cartId,
          user: userId,
          products,
          total,
        });
    
        return transaction.save();
      }
}

export default  TransactionRepository;
