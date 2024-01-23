
import { ulid } from 'ulid';
import express, { Request, Response, NextFunction } from "express";
const app = express()
import { sendResponse } from "../util/common";
import { HTTP_STATUS } from "../constants/statusCode";
import CartModel from "../model/carts"
import TransactionService from "../service/transaction"
import TransactionModel from "../model/transaction";


const SSLCommerzPayment = require('sslcommerz-lts')
const store_id = process.env.store_id
const store_passwd = process.env.store_passwd
const is_live = false //true for live, false for sandbox

class TransactionController {
  static async order(req: Request, res: Response): Promise<any> {
    const {cart}=req.body;
    const isCartMatched = await CartModel.exists({
      _id: cart
    });
    if (!isCartMatched) {
      return sendResponse(
        res,
        HTTP_STATUS.BAD_REQUEST,
        "There is no such cart..."
      );
    }
    const cartInfo = await CartModel.findOne({ _id: cart }).select('Total');

    console.log(cartInfo);
    const Total = cartInfo?.Total;
    const productID: string = ulid();

    const data = {
      total_amount:Total,
      currency: 'BDT',
      tran_id: productID, // use unique tran_id for each API call
      success_url: 'http://localhost:3000/transaction/checkout',
      fail_url: 'http://localhost:3000/fail',
      cancel_url: 'http://localhost:3000/cancel',
      ipn_url: 'http://localhost:3000/ipn',
      shipping_method: 'Courier',
      product_name: 'Computer',
      product_category: 'Electronic',
      product_profile: 'general',
      cus_name: 'user',
      cus_email: 'customer@example.com',
      cus_add1: 'Dhaka',
      cus_add2: 'Dhaka',
      cus_city: 'Dhaka',
      cus_state: 'Dhaka',
      cus_postcode: '1000',
      cus_country: 'Bangladesh',
      cus_phone: '01711111111',
      cus_fax: '01711111111',
      ship_name: 'Customer Name',
      ship_add1: 'Dhaka',
      ship_add2: 'Dhaka',
      ship_city: 'Dhaka',
      ship_state: 'Dhaka',
      ship_postcode: 1000,
      ship_country: 'Bangladesh',
    };

    console.log(data);

    const sslcz = new SSLCommerzPayment( store_id, store_passwd, is_live);

    // sslcz.init(data).then((apiResponse: any) => {
    //   // Redirect the user to the payment gateway
    //   let GatewayPageURL = apiResponse.GatewayPageURL;
    //   res.redirect(GatewayPageURL);
    //   console.log('Redirecting to: ', GatewayPageURL);
    // });
    const apiResponse = await sslcz.init(data);
    const GatewayPageURL = apiResponse?.GatewayPageURL;
    return sendResponse(
      res,
      HTTP_STATUS.OK,
      'Initiated payment. Redirect to the payment gateway...',
      { GatewayPageURL }
    );
  }
   static async checkOut(req: Request, res: Response) {
        try {
    
          const { user, cart } = req.body;
    
          const result = await TransactionService.checkOut(cart, user);
          console.log("Result:",result);
    
          
          return sendResponse(res, HTTP_STATUS.OK, "Transaction Successful!", result);
        } catch (error) {
          console.error(error);
          return sendResponse(
            res,
            HTTP_STATUS.INTERNAL_SERVER_ERROR,
            "Internal Server Error."
          );
        }
      }
}
  
  export default TransactionController;

