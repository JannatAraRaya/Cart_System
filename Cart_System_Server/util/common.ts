
import { Response } from "express";


interface ApiResponse {
    success: boolean;
    message: string;
    result?: any;
    error?: any;
  }
  

const sendResponse = (
    res: Response,
    status: number,
    message: string,
    result: any = null
  ): void => {
    const response: ApiResponse = {
      success: false,
      message: "Internal Server Error",
      error: undefined, 
    };
  
    if (status >= 400) {
      response.error = result;
    } else {
      response.success = true;
      response.result = result;
      response.message = "Successfully completed the operations.";
    }
  
    if (message) {
      response.message = message;
    }
  
    res.status(status).send(response);
  };
  
  export { sendResponse };
  