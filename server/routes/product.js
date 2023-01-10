'use strict';

const express = require('express');
const router = express.Router();

const Product = require('../models/product');
const ProductItem = require('../models/productItem');
const Place = require('./../models/place');
const Rating = require('../models/rating');
const { routeGuard } = require('../middleware/route-guard');
const {
  ErrorResponse,
  modelValidationErrorHelper
} = require('../utils/ErrorHelper');

/*
// These 2 are found under the event router! 
router.get('/', (req, res, next) => {});
router.get('/:productId', (req, res, next) => {});
*/

//get all products from a specific provider (public)
// 🙄 Redudant, I'm sorry
router.get('/provider/:id', (req, res, next) => {
  const { id } = req.params;
  Product.find({
    userId: id
  })
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
      select: 'stars comment productId',
      model: Rating
    })
    .then((products) => {
      res.status(200).json({
        status: 200,
        success: true,
        message: `${products.length} Products of provider with ID ${id} fetched from DB`,
        data: products
      });
    })
    .catch((error) => {
      modelValidationErrorHelper(error);
      next(error);
    });
});

// Provider can create and save a new Product to the database!
router.post('/create', routeGuard, async (req, res, next) => {
  const { _id } = req.payload;

  console.log('req.body: ', req.body, _id);
  const newProduct = new Product({ ...req.body, userId: _id });
  newProduct
    .save()
    .then((createdProduct) => {
      res.status(201).json({
        status: 201,
        success: true,
        message: `Created new Product: ${req.body.title} `,
        data: createdProduct
      });
    })
    .catch((error) => {
      modelValidationErrorHelper(error);
      next(error);
    });
});

// Provider can create and save a new productItem to the database!
// The productItem is neccessary for the provider to be enabled creating new Products
router.post('/item/create', routeGuard, async (req, res, next) => {
  const { _id } = req.payload;

  const { title } = req.body;
  !title &&
    next(
      new ErrorResponse(
        'Title can not be empty, no new eventItem created!',
        400
      )
    );
  const isProductItem = await ProductItem.findOne({ title: title }).exec();

  if (isProductItem) {
    next(
      new ErrorResponse(
        `A eventItem with the title ${title} already exist's!`,
        409
      )
    );
  }
  const newProductItem = new ProductItem({ ...req.body, userId: _id });

  newProductItem
    .save()
    .then((newProductItem) => {
      console.log('Success: ', newProductItem);
      res.status(201).json({
        status: 201,
        message: `Created new productItem: ${title} `,
        data: newProductItem
      });
    })
    .catch((error) => {
      modelValidationErrorHelper(error);
      next(error);
    });
});

// Provider can edit a Product that he has already created in the DB.
router.put('/edit/:productId', routeGuard, (req, res, next) => {
  const { productId } = req.params;

  Product.findByIdAndUpdate(
    productId,
    { ...req.body, $inc: { __v: 1 } },
    { new: true }
  )
    .then((result) => {
      if (!result)
        throw new ErrorResponse(
          `No Product found with the ID of ${placeId}`,
          404
        );
      res.status(201).json({
        success: true,
        message: `Product updates saved in the Database. Edited ${result.__v} times.`,
        status: 201,
        data: result
      });
    })
    .catch((error) => {
      modelValidationErrorHelper(error);
      next(error);
    });
});

// Provider can edit a productItem that he has already created in the DB.
router.put('/item/edit/:productItemId', routeGuard, (req, res, next) => {
  const { productItemId } = req.params;

  ProductItem.findByIdAndUpdate(
    productItemId,
    { ...req.body, $inc: { __v: 1 } },
    { new: true }
  )
    .then((result) => {
      if (!result)
        throw new ErrorResponse(
          `No Product found with the ID of ${productItemId}`,
          404
        );
      res.status(201).json({
        success: true,
        message: `productItem updates saved in the Database. Edited ${result.__v} times.`,
        status: 201,
        data: result
      });
    })
    .catch((error) => {
      modelValidationErrorHelper(error);
      next(error);
    });
});

// Provider can delete a Product that he has already created in the DB.
router.delete('/delete/:productId', routeGuard, (req, res, next) => {
  const { productId } = req.params;

  Product.findByIdAndDelete(productId)
    .then((result) => {
      if (!result)
        throw new ErrorResponse(
          `No Product found with the ID of ${productId}`,
          404
        );

      res.status(200).json({
        success: true,
        message: `Product with ID ${productId} deleted successfully`,
        status: 200,
        data: result
      });
    })
    .catch((error) => {
      modelValidationErrorHelper(error);
      next(error);
    });
});

// Provider can delete a productItem that he has already created in the DB.
router.delete('/item/delete/:productItemId', routeGuard, (req, res, next) => {
  const { productItemId } = req.params;

  ProductItem.findByIdAndDelete(productItemId)
    .then((result) => {
      if (!result)
        throw new ErrorResponse(
          `No ProductItem found with the ID of ${productItemId}`,
          404
        );

      res.status(200).json({
        success: true,
        message: `ProductItem with ID ${productItemId} deleted successfully`,
        status: 200,
        data: result
      });
    })
    .catch((error) => {
      modelValidationErrorHelper(error);
      next(error);
    });
});

/*
// This one is found under the event rounter!
router.post('/:productId/rating/', routeGuard, (req, res, next) => {});
*/

module.exports = router;
