import express from "express";
const routes = express();
import TransactionController from "../controller/transactionController";


routes.post("/successful", TransactionController.successTransaction);
routes.post("/failed", TransactionController.failedTransaction);
routes.post("/order", TransactionController.order);

module.exports = routes;