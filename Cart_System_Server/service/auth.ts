import AuthRepository from "../repository/auth";
import bcrypt from "bcrypt";
import IResponse from "../util/responseInterface";
import { Console } from "console";

class AuthService {
  static async loginUser(email: string, password: string): Promise<IResponse> {
    try {
      const user = await AuthRepository.findUserByEmail(email);
      // console.log(user?.password);
      // console.log(password)
      if (!user) {
        return {
          success: false,
          message: "User not found.",
        };
      }

      const passwordMatch = password===user.password?true:false;
      console.log(passwordMatch)

      if (passwordMatch) {
        return {
          success: true,
          message: "Login successful.",
          data: user,
        };
      } else {
        return {
          success: false,
          message: "Invalid email or password.",
        };
      }
    } catch (error) {
      console.error(error);
      return {
        success: false,
        error: error,
      };
    }
  }
}

export default AuthService;
