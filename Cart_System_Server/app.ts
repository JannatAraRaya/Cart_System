
import express from "express";
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


app.use("*",(req,res)=>{
   return sendResponse(res,HTTP_STATUS.NOT_FOUND,"Wrong URL,Please re-check your URL.")
});


// Database connection check
databaseConnection(()=>{
   app.listen(8000,()=>{
      console.log("Server is running on port 8000...")
   })
})