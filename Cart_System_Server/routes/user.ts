import express from "express";
const routes = express();
import UserController from"../controller/userController";


 routes.post("/create", UserController.createUser);

module.exports = routes;