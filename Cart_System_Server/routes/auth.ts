import express from "express";
const routes = express();
import AuthController from "../controller/authController";


routes.post("/login", AuthController.login);

module.exports = routes;