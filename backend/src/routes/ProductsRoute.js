const express = require("express");
const product = express.Router();
const Products = require("../controllers/CreateProduct.js");
const authMiddleware = require("../services/authMiddleware.js");
const { isAdmin } = require("../services/authAdmin.js");

product.get(
  "/auth/getProductsLists",
  authMiddleware,
  Products.getProductsLists
);

product.post(
  "/auth/createProducts",authMiddleware,Products.createProduct
);
product.delete(
  `/auth/deleteProduct/:data`,
  authMiddleware,
  Products.deleteProduct
);
product.patch("/auth/updateProduct/:id", authMiddleware, Products.updateProduct);


module.exports = product;
