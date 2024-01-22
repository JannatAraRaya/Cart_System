// repository/product.ts
import ProductModel, { ProductType } from "../model/product";
import IResponse from "../util/responseInterface";

class ProductRepository {
 static async createProduct(productData: ProductType): Promise<IResponse> {
    try {
      const createdProduct = await ProductModel.create(productData);
      return {
        success: true,
        data: createdProduct,
      };
    } catch (error) {
      console.error(error);
      return {
        success: false,
        message:"Error creating new product..",
        error: error,
      };
    }
  }
 static async findProducts(): Promise<IResponse> {
    try {
      const getProducts = await ProductModel.find({}).limit(10);
      const totalProducts = await ProductModel.countDocuments({});

      return {
        success: true,
        message: "Products fetched successfully",
        data: {
          totalProducts,
          countPerPage: getProducts.length,
          result: getProducts,
        },
      };
    } catch (error) {
      return {
        success: false,
        message: "Error fetching Products",
        error: error,
      };
    }
  }
}

export default ProductRepository;
