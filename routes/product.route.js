const express = require("express");
const Product = require("../models/product.model.js");
const router = express.Router();
const { getProducts, getProduct, createProduct, updatedProduct, deletedProduct } = require('../controllers/product.controller.js');

router.get('/', getProducts);
router.get('/', getProduct);

router.post("/:id", createProduct);

//update a product
router.put("/:id", updatedProduct);

//delete a product
router.delete("/:id", deletedProduct);

module.exports = router;
