'use strict';

const express = require('express');
const router = express.Router();

const Product = require('../models/product');
const ProductItem = require('../models/productItem');
const { routeGuard } = require('../middleware/route-guard');
const {
  ErrorResponse,
  modelValidationErrorHelper
} = require('../utils/ErrorHelper');

router.get('/', (req, res, next) => {});

router.get('/:productId', (req, res, next) => {});

router.get('/:id', (req, res, next) => {});

router.post('/create', routeGuard, (req, res, next) => {});

router.post('/item/create', routeGuard, async (req, res, next) => {
  const { _id } = req.payload;

  const { title, eventDate, description, places } = req.body;
  !title &&
    next(
      new ErrorResponse(
        'Title can not be empty, no new eventItem created!',
        400
      )
    );
  const isProductItem = await ProductItem.findOne({ title: title }).exec();

  const date = new Date('2023-01-21');

  if (isProductItem) {
    next(
      new ErrorResponse(
        `A eventItem with the title ${title} already exist's!`,
        409
      )
    );

    ProductItem.create({ ...req.body, userId: _id })
      .then((createdItem) => {
        console.log(createdItem);
        res
          .status(201)
          .json({
            status: 201,
            message: `Created new eventItem: ${title} `,
            data: createdItem
          });
      })
      .catch((error) => {
        modelValidationErrorHelper(error);
        next(error);
      });
  }
});

//??? what i want to do here ???
router.post('/:productId/add-event', (req, res, next) => {});

router.put('/edit/:productId', routeGuard, (req, res, next) => {});

router.put('/item/edit/:productItemId', routeGuard, (req, res, next) => {});

router.delete('/delete/:productId', routeGuard, (req, res, next) => {});

router.delete(
  '/item/delete/:productItemId',
  routeGuard,
  (req, res, next) => {}
);

router.post('/:productId/rating/', routeGuard, (req, res, next) => {});

module.exports = router;
