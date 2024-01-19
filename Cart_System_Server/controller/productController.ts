import { Request, Response, NextFunction } from "express";
import ProductModel, { ProductType } from "../model/product";

class Product {
  async createProduct(req: Request, res: Response, next: NextFunction) {
    const { image, name, price, inStock, available } = req.body;

    try {
      const productData: ProductType = {
        image,
        name,
        price,
        inStock,
        available,
      };

      const createdProduct = await ProductModel.create(productData);

      res.status(201).json({
        success: true,
        message: "Product created successfully",
        result: createdProduct,
      });
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
}

module.exports=new Product();
