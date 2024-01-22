// service/product.ts
import ProductRepository from "../repository/product";
import { ProductType } from "../model/product";
import IResponse from "../util/responseInterface";

class ProductService {
  static async createProduct(productData: ProductType): Promise<IResponse> {
    const product = await ProductRepository.createProduct(productData);

    if (!product.success) {
      return {
        success: false,
        message: "Error creating product",
      };
    }

    return {
      success: true,
      data: product.data,
    };
  }
  static async findProducts():Promise<IResponse>{
    const productGetResponse = await ProductRepository.findProducts();
    if(!productGetResponse.success){
        return {
            success:false,
            message:"Error fetching the products",
        }
    }
    return productGetResponse;
  }

}

export default  ProductService;
