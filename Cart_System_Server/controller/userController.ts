import { Request, Response, NextFunction } from "express";
import UserModel, { UserType } from "../model/user";
import { sendResponse } from "../util/common";
import { HTTP_STATUS } from "../constants/statusCode";
import UserService from "../service/user";
class User {
    static async createUser(req: Request, res: Response, next: NextFunction) {
        const { username, email, password, gender } = req.body;

        try {
            const userData = {
                username, email, password, gender
            };
            const createdUsersResponse = await UserService.createUser(userData);

            if (!createdUsersResponse.success) {
                return sendResponse(
                    res,
                    HTTP_STATUS.BAD_REQUEST,
                    createdUsersResponse.error
                );
            }
    
            return sendResponse(
                res,
                HTTP_STATUS.OK,
                "Successfully data entered for new user!",
                createdUsersResponse.data 
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
}


export default User;
