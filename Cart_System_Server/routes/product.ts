import express from "express";
const routes = express.Router();
import ProductController from "../controller/productController";


routes.post("/create", ProductController.createProduct);
routes.get("/viewall", ProductController.viewAll);
// routes.get("/view", ProductController.view);
// routes.delete("/delete", ProductController.delete);

module.exports = routes;