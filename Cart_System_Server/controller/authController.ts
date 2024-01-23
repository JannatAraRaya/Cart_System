import { Request, Response, NextFunction } from "express";
import mongoose, { Document, Schema } from 'mongoose';
import { sendResponse } from "../util/common";
import { HTTP_STATUS } from "../constants/statusCode";
import AuthService from "../service/auth";
import AuthModel,{AuthType} from "../model/auth"
import UserModel,{UserType,UserDocument} from "../model/user"
import jsonwebtoken from 'jsonwebtoken';
const crypto = require("crypto");
const bcrypt = require("bcrypt");

    class Auth {
      static async login(req: Request, res: Response, next: NextFunction) {
        try {
          const { email, password } = req.body;
    
          const authorizedUser = await AuthModel.findOne({ email: email })
            .populate('user');
    
          if (!authorizedUser) {
            return sendResponse(
              res,
              HTTP_STATUS.UNAUTHORIZED,
              'User is not registered!'
            );
          }
    
          const isValidPassword = await bcrypt.compare(
            password,
            authorizedUser.password || ''
          );
    
          if (isValidPassword) {
            const responseAuth = authorizedUser.toObject();
            
            const { password: _, ...responseWithoutPassword } = responseAuth;
            const jswt = jsonwebtoken.sign(responseWithoutPassword, process.env.SECRET_KEY!, {
              expiresIn: '1h',
            });
    
            return sendResponse(
              res,
              HTTP_STATUS.OK,
              'Successfully logged in...',
              { token: jswt }
            );
          } else {
            return sendResponse(
              res,
              HTTP_STATUS.UNAUTHORIZED,
              'Invalid Credentials!'
            );
          }
        } catch (error) {
          console.error(error);
          return sendResponse(
            res,
            HTTP_STATUS.NON_AUTHORITATIVE_INFORMATION,
            'Authentication Error...'
          );
        }
      }
      static async signup(req: Request, res: Response, next: NextFunction) {
        try {
          const { username, email, password } = req.body;
    
          const existingUser = await AuthModel.findOne({ email: email });
    
          if (existingUser) {
            return sendResponse(
              res,
              HTTP_STATUS.BAD_REQUEST,
              'User with this email already exists.'
            );
          }
    
          const hashedPassword = await bcrypt.hash(password, 10);
    
          const user: UserDocument = new UserModel({
            username: username,
            email: email,
            password: hashedPassword,
          });
          const savedUser= await user.save();
          const newUser: AuthType = new AuthModel({
            username: username,
            email: email,
            password: hashedPassword,
            user: savedUser._id, 
          });
    
          await newUser.save();
 
          
          return sendResponse(
            res,
            HTTP_STATUS.CREATED,
            'User registered successfully.',
            { user: newUser }
          );
        } catch (error) {
          console.error(error);
          return sendResponse(
            res,
            HTTP_STATUS.INTERNAL_SERVER_ERROR,
            'Internal Server Error.'
          );
        }
      }
    }
export default Auth;
// class Auth {
    // static async login(req: Request, res: Response, next: NextFunction) {
    //     const { email, password } = req.body;

    //     try {
    //       const loginResponse = await AuthService.loginUser(email, password);
    
    //       if (!loginResponse.success) {
    //         return sendResponse(
    //           res,
    //           HTTP_STATUS.UNAUTHORIZED,
    //           loginResponse.message || "Authentication failed.",
    //           loginResponse.error
    //         );
            
    //       }
    
    //       return sendResponse(
    //         res,
    //         HTTP_STATUS.OK,
    //         loginResponse.data,
    //         loginResponse.message
    //       );
    //     }  catch (error) {
    //         console.error("error", error);
    //         return sendResponse(
    //             res,
    //             HTTP_STATUS.INTERNAL_SERVER_ERROR,
    //             "Internal Server Error..."
    //         );
    //     }
    // }
// }