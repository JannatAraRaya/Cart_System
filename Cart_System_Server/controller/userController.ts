import { Request, Response, NextFunction } from "express";
import UserModel, { UserType } from "../model/user";
import { sendResponse } from "../util/common";
import { HTTP_STATUS } from "../constants/statusCode";
class User {
    async createUser(req: Request, res: Response, next: NextFunction) {
        const { username, email, password, gender } = req.body;

        try {
            const userData: UserType = {
                username, email, password, gender
            };

            const createdUsers = await UserModel.create(userData);

            return sendResponse(
                res,
                HTTP_STATUS.OK,
                "Successfully Products Added!",
                createdUsers
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


module.exports = new User();
