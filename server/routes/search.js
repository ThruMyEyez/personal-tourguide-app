const express = require('express');
const router = express.Router();
const ProductItem = require('../models/productItem');
const Product = require('../models/product');

router.get('/:searchTerm', (req, res, next) => {
  const { searchTerm } = req.params;

  Product.find({
    title: { $regex: searchTerm, $options: 'i' }
  })
    .then((products) => {
      res.status(200).json({
        success: true,
        message: `${products.length} products found`,
        products: products,
        status: 200
      });
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
