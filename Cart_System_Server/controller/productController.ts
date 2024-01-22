import { Request, Response, NextFunction } from "express";
import ProductModel, { ProductType } from "../model/product";
import { sendResponse } from "../util/common";
import { HTTP_STATUS } from "../constants/statusCode";
import ProductService from "../service/product"
class Product {
  static async createProduct(req: Request, res: Response, next: NextFunction) {
    const { image, title, price, inStock, available, rating } = req.body;

    try {
      const productData = {
        image,
        title,
        price,
        inStock,
        available,
        rating,
      };

      const createdProductResponse = await ProductService.createProduct(
        productData
      );

      if (!createdProductResponse.success) {
        return sendResponse(
          res,
          HTTP_STATUS.BAD_REQUEST,
          "Product could not be created..."
        );
      }

      return sendResponse(
        res,
        HTTP_STATUS.OK,
        "Successfully Products Added!",
        createdProductResponse.data
      );
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
  static async viewAll(req: Request, res: Response, next: NextFunction) {
    try {
      const productsResponse = await ProductService.findProducts();
      if (!productsResponse.success) {
        return sendResponse(
          res,
          HTTP_STATUS.NOT_FOUND,
          "Something went wrong..."
        );
      }

      return sendResponse(res, HTTP_STATUS.OK, "Successfully received all products!", productsResponse.data);
    } catch (error) {
      console.log(error);
      next(error);
      return sendResponse(
        res,
        HTTP_STATUS.INTERNAL_SERVER_ERROR,
        "Internal Server Error..."
      );

    }
  }

  // async view(req: Request, res: Response, next: NextFunction) {
  //   const { productID } = req.query;
  //   const product = await ProductModel.findById(productID);

  //   try {
  //     const product = await ProductModel.findById(productID);

  //     if (!product) {
  //       return res.status(404).json({ message: 'Product not found' });
  //     }
  //     return res.status(200).json({ product });
  //   } catch (error) {
  //     console.log(error);
  //     next(error);
  //     return sendResponse(
  //       res,
  //       HTTP_STATUS.INTERNAL_SERVER_ERROR,
  //       "Internal Server Error..."
  //     );
  //   }
  // }
  // async delete(req: Request, res: Response, next: NextFunction) {
  //   try {
  //     const { productID } = req.query;
  //     console.log(productID);

  //     const deleteItemResult = await ProductModel.deleteOne({
  //       _id: productID,
  //     });

  //     if (deleteItemResult.deletedCount > 0) {
  //       return sendResponse(res, HTTP_STATUS.OK, "Product deleted Successfully");
  //     } else {
  //       return sendResponse(res, HTTP_STATUS.NOT_FOUND, "Product not found!");
  //     }
  //   } catch (error) {
  //     console.log(error);

  //     return sendResponse(
  //       res,
  //       HTTP_STATUS.INTERNAL_SERVER_ERROR,
  //       "Internal Server Error..."
  //     );
  //   }
  // }
}


export default Product;
