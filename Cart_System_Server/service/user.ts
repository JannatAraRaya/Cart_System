// service/product.ts
import UserRepository from "../repository/user";
import { UserType} from "../model/user";
import IResponse from "../util/responseInterface";

class UserService {
  static async createUser(userData: UserType): Promise<IResponse> {
    const user = await UserRepository.createUser(userData);

    if (!user.success) {
      return {
        success: false,
        message:user.message,
        error: user.error,
      };
    }

    return {
      success: true,
      data: user.data,
    };
  }


}

export default  UserService;
