import express from "express";
const routes = express();
import CartController from "../controller/cartContoller";


routes.post("/addtocart", CartController.addProductToCart);

module.exports = routes;