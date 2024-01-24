
import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
const cors = require("cors");
import { sendResponse } from "./util/common";
import {HTTP_STATUS} from "./constants/statusCode";
import {databaseConnection} from "./config/database";
dotenv.config();


const app = express();
app.use(cors({origin:"*"}));
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));


//Exporting all the routes
const ProductRouter = require("./routes/product");
const UserRouter = require("./routes/user");
const AuthRouter = require("./routes/auth");
const CartRouter = require("./routes/cart");
const TransactionRouter = require("./routes/transaction");



//main routers
app.use("/products", ProductRouter);
app.use("/users", UserRouter);
app.use("/auth",AuthRouter);
app.use("/cart",CartRouter);
app.use("/transaction",TransactionRouter);




app.use("*",(req,res)=>{
   return sendResponse(res,HTTP_STATUS.NOT_FOUND,"Wrong URL,Please re-check your URL.")
});

// Error Handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
   if (err instanceof SyntaxError && "body" in err) {
     return sendResponse(res, HTTP_STATUS.BAD_REQUEST, "Invalid JSON Format!");
   }
   next();
 });
// Database connection check
databaseConnection(()=>{
   app.listen(8000,()=>{
      console.log("Server is running on port 8000...")
   })
})