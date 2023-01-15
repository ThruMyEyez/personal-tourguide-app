const express = require('express');
const router = express.Router();
require('dotenv').config();
const stripe = require('stripe')(
  'sk_test_51MOmpwG0oGZ76irVjck88Gbx8bhr1jeHz6raF4ClicmhQvgXdMF7jr3jWh67iu7Jl5HCjo6l9l4oZMXrtSombgTE00MHBnW2zw'
);

const Product = require('../models/product');

router.post('/:productId', async (req, res, next) => {
  const { productId } = req.params;
  let productDocument;

  try {
    Product.findById(productId)
      .then((product) => {
        productDocument = product;
        return stripe.checkout.sessions.create({
          payment_method_types: ['card'],
          line_items: [
            {
              price_data: {
                currency: 'eur',
                product_data: {
                  name: product.title
                },
                unit_amount: product.priceInCents
              },
              quantity: 1
            }
          ],
          mode: 'payment',
          success_url: `http://localhost:3000/purchase/success`,
          cancel_url: `http://localhost:3000/purchase/cancel`
        });
      })
      .then((session) => {
        res.status(200).json({
          session
        });
      })
      .catch((error) => {
        next(error);
      });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
