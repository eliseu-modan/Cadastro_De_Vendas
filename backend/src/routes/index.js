const express = require("express");
const userRoutes = require("./UserRoute");
const products = require("./ProductsRoute");
const sales = require("./SalesRoute");
const dashboard = require("./Dashboard")

const routes = express.Router();

routes.use("/users", userRoutes);
routes.use("/products", products);
routes.use("/sales", sales);
routes.use("/dashboard", dashboard);

module.exports = routes;
