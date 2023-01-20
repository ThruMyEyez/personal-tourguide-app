const express = require('express');
const router = express.Router();
require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY);

const Product = require('../models/product');
const ProductItem = require('../models/productItem');
const Purchase = require('../models/purchase');
const Place = require('../models/place');
const {
  ErrorResponse,
  modelValidationErrorHelper
} = require('../utils/ErrorHelper');

router.post('/:productId', async (req, res, next) => {
  const { productId } = req.params;
  let productDocument;

  try {
    Product.findById(productId)
      .populate({
        path: 'productItem',
        select: 'userId title eventDate description places',
        model: ProductItem,
        populate: {
          path: 'places',
          select: ' title  description ',
          model: Place
        }
      })
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
          success_url: `${process.env.CLIENT_APP_ORIGINS}/purchase/success?session_id={CHECKOUT_SESSION_ID}`,
          cancel_url: `${process.env.CLIENT_APP_ORIGINS}/purchase/cancel`
        });
      })
      .then((session) => {
        Purchase.create({
          session: JSON.stringify(session),
          sessionId: session.id,
          userId: productDocument.userId,
          product: JSON.stringify(productDocument),
          productId: productDocument._id,
          status: 'PaymentDone'
        }).then((purchase) => {
          res.status(200).json({
            session,
            data: purchase
          });
        });
      })
      .catch((error) => {
        next(error);
      });
  } catch (error) {
    next(error);
  }
});

router.get('/success/:id', (req, res, next) => {
  const { id } = req.params;
  console.log(id);
  Purchase.findOne({ sessionId: id }).then((purchase) => {
    !purchase &&
      next(new ErrorResponse(`Purchase with ID "${id}" not found`, 400));
    const fullProduct = JSON.parse(purchase.product);
    const fullSession = JSON.parse(purchase.session);
    purchase = {
      ...purchase._doc,
      product: fullProduct,
      session: fullSession
    };
    res.status(200).json({
      purchase
    });
  });
});

module.exports = router;
