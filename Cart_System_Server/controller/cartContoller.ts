import { Request, Response, NextFunction } from "express";
import jsonwebtoken from 'jsonwebtoken';
import CartService from "../service/cart";
import UserModel from "../model/user";
import CartModel from "../model/carts"
import { sendResponse } from "../util/common";
import { HTTP_STATUS } from "../constants/statusCode";

class CartController {
  static async addProductToCart(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { userId, productId, quantity } = req.body;
      const response = await CartService.createProduct(
        userId,
        productId,
        quantity
      );

      if (response.success) {
        return sendResponse(
          res,
          HTTP_STATUS.OK,
          "Product added to cart successfully",
          response.data
        );
      } else {
        return sendResponse(
          res,
          HTTP_STATUS.BAD_REQUEST, "Something went wrong..."
        );
      }
    } catch (error) {
      console.error(error);
      return sendResponse(
        res,
        HTTP_STATUS.INTERNAL_SERVER_ERROR,
        "Internal Server Error..."
      );
    }
  }
  static async removeItemFromCart(
    req: Request,
    res: Response,
  ) {
    try {
      const { userId, productId } = req.body;
      const response = await CartService.removeProductFromCart(
        userId,
        productId
      );

      if (response.success) {
        return sendResponse(
          res,
          HTTP_STATUS.OK,
          "Product removed from cart successfully",
          response.data
        );
      } else {
        return sendResponse(
          res,
          HTTP_STATUS.BAD_REQUEST, "Something went wrong..."
        );
      }
    } catch (error) {
      console.error(error);
      return sendResponse(
        res,
        HTTP_STATUS.INTERNAL_SERVER_ERROR,
        "Internal Server Error..."
      );
    }
  }
  static async viewCart(req: Request, res: Response): Promise<void> {
    try {
      
      const jwtToken = req.headers.authorization?.split(' ')[1];
      if (!jwtToken) {
        return sendResponse(res, HTTP_STATUS.UNAUTHORIZED, 'Unauthorized');
      }
  
      const decodedToken: any = jsonwebtoken.decode(jwtToken);
      console.log(decodedToken)
      if (!decodedToken || !decodedToken.user || !decodedToken.user._id) {
        return sendResponse(res, HTTP_STATUS.UNAUTHORIZED, 'Invalid token');
      }
  
      const user = await UserModel.findById(decodedToken.user._id);
      if (!user) {
        return sendResponse(res, HTTP_STATUS.NOT_FOUND, 'User not found!');
      }
  
      const cartItem = await CartModel.findOne({
        user: decodedToken.user._id,
      }).populate('products');
  
      if (!cartItem) {
        return sendResponse(
          res,
          HTTP_STATUS.NOT_FOUND,
          'Cart not found for the user'
        );
      }
  
      return sendResponse(
        res,
        HTTP_STATUS.OK,
        'Cart retrieved successfully',
        cartItem
      );
    } catch (error) {
      console.error(error);
      return sendResponse(
        res,
        HTTP_STATUS.INTERNAL_SERVER_ERROR,
        'Internal Server Error...'
      );
    }
  }

}

export default CartController;
