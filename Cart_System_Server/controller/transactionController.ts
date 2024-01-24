import { uuid } from "uuidv4";
import mongoose, { Document, Schema } from "mongoose";
import express, { Request, Response, NextFunction } from "express";
const app = express();
import { sendResponse } from "../util/common";
import { HTTP_STATUS } from "../constants/statusCode";
import CartModel, { CartType } from "../model/carts";
import TransactionService from "../service/transaction";
import TransactionModel, { TransactionType } from "../model/transaction";
import dotenv from "dotenv";
dotenv.config();

const SSLCommerzPayment = require("sslcommerz-lts");
const store_id = "abcco65af2835d0ef1";
const store_passwd = "abcco65af2835d0ef1@ssl";
const is_live = false; //true for live, false for sandbox

class TransactionController {
  static async order(req: Request, res: Response): Promise<any> {
    const { user, cart } = req.body;
    const isCartMatched = await CartModel.exists({
      _id: cart,
    });
    if (!isCartMatched) {
      return sendResponse(
        res,
        HTTP_STATUS.BAD_REQUEST,
        "There is no such cart..."
      );
    }
    const cartInfo = await CartModel.findOne({ _id: cart }).select("Total");

    // console.log("cartinfo:",cartInfo);
    const Total = cartInfo?.Total;
    const transactionId = uuid();
    const result = await TransactionService.checkOut(cart, user, transactionId);
    // console.log("Result:", result);

    const data = {
      total_amount: Total,
      currency: "BDT",
      tran_id: transactionId, // use unique tran_id for each API call
      success_url: "http://localhost:8000/transaction/successful",
      fail_url: "http://localhost:8000/transaction/failed",
      cancel_url: "http://localhost:3000/cancel",
      ipn_url: "http://localhost:3000/ipn",
      shipping_method: "Courier",
      product_name: "Computer",
      product_category: "Electronic",
      product_profile: "general",
      cus_name: "user",
      cus_email: "customer@example.com",
      cus_add1: "Dhaka",
      cus_add2: "Dhaka",
      cus_city: "Dhaka",
      cus_state: "Dhaka",
      cus_postcode: "1000",
      cus_country: "Bangladesh",
      cus_phone: "01711111111",
      cus_fax: "01711111111",
      ship_name: "Customer Name",
      ship_add1: "Dhaka",
      ship_add2: "Dhaka",
      ship_city: "Dhaka",
      ship_state: "Dhaka",
      ship_postcode: 1000,
      ship_country: "Bangladesh",
    };

    // console.log(data);

    const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);

    // sslcz.init(data).then((apiResponse: any) => {
    //   console.log(apiResponse);
    //   console.log("dataaaaaaaaaaaa",data);
    //   // Redirect the user to the payment gateway
    //   let GatewayPageURL = apiResponse.GatewayPageURL;
    //   res.redirect(GatewayPageURL);
    //   console.log('Redirecting to: ', GatewayPageURL);
    // });
    const apiResponse = await sslcz.init(data);
    // console.log(apiResponse)
    const GatewayPageURL = apiResponse?.GatewayPageURL;
    return sendResponse(
      res,
      HTTP_STATUS.OK,
      "Initiated payment. Redirect to the payment gateway...",
      { GatewayPageURL }
    );
  }

  static async successTransaction(req: Request, res: Response) {
    try {
      const { tran_id } = req.body;
      console.log("body:", req.body);
      return res.redirect(`${process.env.FRONTEND_URL}/SuccessfulTransaction`);
      //  return sendResponse(res, HTTP_STATUS.OK, "Transaction Successful!");
    } catch (error) {
      console.error(error);
      return sendResponse(
        res,
        HTTP_STATUS.INTERNAL_SERVER_ERROR,
        "Internal Server Error."
      );
    }
  }

  static async failedTransaction(req: Request, res: Response) {
    try {
      const { tran_id } = req.body;
      console.log(req.body);
      const transaction = await TransactionModel.findOne({ transid: tran_id });
      const userId = transaction?.user;
      console.log(userId)
      const originalCart = await CartModel.findOne({ user: userId });
      console.log(originalCart)
      await CartModel.findByIdAndUpdate(originalCart?._id, {
        products: originalCart?.products,
        Total: originalCart?.Total,
      });
  
      await TransactionModel.deleteOne({ transid: tran_id });
      console.log("Payment Failed");
      return res.redirect(`${process.env.FRONTEND_URL}/FailedTransaction`);
      //  return sendResponse(res, HTTP_STATUS.OK, "Transaction Failed!");
    } catch (error) {
      console.log(error);
      return sendResponse(
        res,
        HTTP_STATUS.INTERNAL_SERVER_ERROR,
        "Internal Server Error"
      );
    }
  }
}

export default TransactionController;
