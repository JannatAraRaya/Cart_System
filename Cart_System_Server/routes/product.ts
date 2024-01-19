import express from "express";
const routes = express();
const ProductController = require("../controller/productController");


routes.post("/create", ProductController.createProduct);

module.exports = routes;