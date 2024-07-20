const express = require("express");
const sale = express.Router();
const Sales = require("../controllers/CreateSales.js");
const authMiddleware = require("../services/authMiddleware.js");

sale.post(
  "/auth/createSales",
  authMiddleware,
  Sales.createSales
);

sale.get(
  "/auth/getSalesLists",
  authMiddleware,
  Sales.getSalesLists
);

sale.patch(
  "/auth/editSales/:id",
  authMiddleware,
  Sales.editSales
);

sale.delete(
  "/auth/deleteSales/:data",
  authMiddleware,
  Sales.deleteSales
);
module.exports = sale;
