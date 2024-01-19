import express from "express";
const routes = express();
const UserController = require("../controller/userController");


routes.post("/create", UserController.createUser);

module.exports = routes;