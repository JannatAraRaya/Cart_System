import express from "express";
const routes = express();
import CartController from "../controller/cartContoller";


routes.post("/addtocart", CartController.addProductToCart);
routes.post("/removeItem", CartController.removeItemFromCart);
routes.get("/view", CartController.viewCart);

module.exports = routes;