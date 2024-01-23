import express from "express";
const routes = express();
import TransactionController from "../controller/transactionController";


routes.post("/checkout", TransactionController.checkOut);
routes.post("/order", TransactionController.order);

module.exports = routes;