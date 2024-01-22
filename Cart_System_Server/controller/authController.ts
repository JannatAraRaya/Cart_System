import { Request, Response, NextFunction } from "express";
import { sendResponse } from "../util/common";
import { HTTP_STATUS } from "../constants/statusCode";
import AuthService from "../service/auth";

class Auth {
    static async login(req: Request, res: Response, next: NextFunction) {
        const { email, password } = req.body;

        try {
          const loginResponse = await AuthService.loginUser(email, password);
    
          if (!loginResponse.success) {
            return sendResponse(
              res,
              HTTP_STATUS.UNAUTHORIZED,
              loginResponse.message || "Authentication failed.",
              loginResponse.error
            );
            
          }
    
          return sendResponse(
            res,
            HTTP_STATUS.OK,
            loginResponse.data,
            loginResponse.message
          );
        }  catch (error) {
            console.error("error", error);
            return sendResponse(
                res,
                HTTP_STATUS.INTERNAL_SERVER_ERROR,
                "Internal Server Error..."
            );
        }
    }
}

export default Auth;
