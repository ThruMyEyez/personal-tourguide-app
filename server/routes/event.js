'use strict';
const express = require('express');
const router = express.Router();
const Purchase = require('../models/purchase');
const Product = require('./../models/product');
const ProductItem = require('./../models/productItem');
const Rating = require('./../models/rating');
const Place = require('./../models/place');
const { routeGuard } = require('../middleware/route-guard');
const {
  ErrorResponse,
  modelValidationErrorHelper
} = require('../utils/ErrorHelper');
const mongoose = require('mongoose');
const dayjs = require('dayjs');

// - GET -> router.get('/', (req, res, next) => {}) (get all the events from the DB)
router.get('/', (req, res, next) => {
  Product.find()
    .populate({
      path: 'productItem',
      select: 'userId title eventDate description places',
      model: ProductItem,
      populate: {
        path: 'places',
        select: 'title description picture moreLink position',
        model: Place
      }
    })
    .populate({
      path: 'rating',
      select: 'stars comment productId userId',
      model: Rating
    })
    .then((events) => {
      res.status(200).json({
        success: true,
        message: `${events.length} events found`,
        places: events,
        status: 200
      });
    })
    .catch((err) => {
      next(err);
    });
});

// - GET -> router.get('/:productId' (req, res, next) => {}) (get the product: productItem detail page data)
router.get('/:id', (req, res, next) => {
  const { id } = req.params;
  Product.findById(id)
    .populate({
      path: 'productItem',
      select: 'userId title eventDate description places',
      model: ProductItem,
      populate: {
        path: 'places',
        select: 'title description picture moreLink position',
        model: Place
      }
    })
    .populate({
      path: 'rating',
      select: 'stars comment productId userId',
      model: Rating
    })
    .then((event) => {
      if (!event) {
        next(new ErrorResponse(`Event not found!`, 404));
      }
      const formatedDate = dayjs(`${event.productItem.eventDate}`)
        .toDate()
        .toLocaleDateString('en-GB');
      console.log('eventON: ', formatedDate);
      res.status(200).json({
        message: `Event ${event.title} found`,
        data: event,
        date: formatedDate
      });
    })
    .catch((err) => {
      next(err);
    });
});

// - POST-> router.post('/:productId/rating/' (req, res, next) )
router.post('/rating/:productId', routeGuard, async (req, res, next) => {
  const { productId } = req.params;
  const { _id } = req.payload;
  const { stars, comment } = req.body;
  let rating = {};
  console.log(stars, comment);
  //Check if is stars evaluation

  if (!stars) {
    next(new ErrorResponse('A number of stars is required', 400));
  }

  //Check is is between 0 and 5
  if (stars > 5 || stars < 0) {
    next(
      new ErrorResponse('The number of stars should be between 0 and 5', 400)
    );
  }

  //Needs to have bought this event before beeing able to posta rating
  const hasPurchusedThisEvent = await Purchase.findOne({
    userId: _id,
    'product._id': mongoose.Types.ObjectId(productId)
  }).exec();

  // if (!hasPurchusedThisEvent) {
  //   next(new ErrorResponse(`Purchase not found`, 404));
  // }

  Rating.create({ productId, userId: _id, stars, comment })
    .then((result) => {
      console.log(result._id);
      Product.findOneAndUpdate(
        { _id: productId },
        { $push: { rating: [result._id] } },
        { new: true }
      ).then((prduct) => console.log(prduct));
      res.status(201).json({
        status: 201,
        message: `Created new eventItem: ${rating.comment} `,
        data: result
      });
    })
    .catch((err) => {
      modelValidationErrorHelper(err);
      next(err);
    });
});

// - POST-> router.get('/booking/:productId', (req, res, next) => {}) (if customer purchase a tour or event)
// - PUT -> router.put('/booked/:productId', (req, res, next) => {}) (update the status of a purchase)
module.exports = router;
