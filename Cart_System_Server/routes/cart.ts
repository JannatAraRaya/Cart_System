import express from "express";
const routes = express();
import CartController from "../controller/cartContoller";


routes.post("/addtocart", CartController.addProductToCart);
routes.get("/view", CartController.viewCart);

module.exports = routes;