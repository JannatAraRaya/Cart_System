import { Request, Response, NextFunction } from "express";
import CartService from "../service/cart";
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
          HTTP_STATUS.BAD_REQUEST,
          response.error || "Something went wrong..."
        );
      }
    } catch (error) {
      console.error(error);
      next(error);
      return sendResponse(
        res,
        HTTP_STATUS.INTERNAL_SERVER_ERROR,
        "Internal Server Error..."
      );
    }
  }
}

export default CartController;
