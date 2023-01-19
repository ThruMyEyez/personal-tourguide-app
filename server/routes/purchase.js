const express = require('express');
const router = express.Router();
require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY);

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
          success_url: `${process.env.CLIENT_APP_ORIGINS}/purchase/success`,
          cancel_url: `${process.env.CLIENT_APP_ORIGINS}/purchase/cancel`
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
