'use strict';

const express = require('express');
const router = express.Router();

const Place = require('./../models/place');
const { routeGuard } = require('../middleware/route-guard');
const {
  ErrorResponse,
  modelValidationErrorHelper
} = require('../utils/ErrorHelper');

//Get all places belonging to the current user
router.get('/', routeGuard, (req, res, next) => {
  const { _id } = req.payload;

  Place.find({ userId: _id })
    .then((places) => {
      res.status(200).json({
        success: true,
        message: `${places.length} provider generated places found`,
        data: places
      });
    })
    .catch((error) => next(error));
});

router.post('/create', routeGuard, async (req, res, next) => {
  const { _id } = req.payload;
  const { title } = req.body;

  const isPlace = await Place.findOne({ title: title }).exec();

  //!title &&
  //  res.status(400).json({
  //    success: false,
  //    message: 'Title can not be empty, no new place created!'
  //  });

  if (isPlace) {
    next(
      new ErrorResponse(`A Place with the title ${title} already exist's!`, 409)
    );
  } else {
    Place.create({ ...req.body, userId: _id }, { new: true })
      .then((result) => {
        res.status(201).json({
          success: true,
          message: 'Place saved in the Database',
          data: result
        });
      })
      .catch((error) => {
        modelValidationErrorHelper(error);
        next(error);
      });
  }
});

// req.body should contain: title, description, picture, moreLink & position
router.put('/edit/:placeId/', routeGuard, (req, res, next) => {
  const { placeId } = req.params;

  Place.findByIdAndUpdate(
    placeId,
    { ...req.body, $inc: { __v: 1 } },
    { new: true }
  )
    .then((result) => {
      if (!result)
        throw new ErrorResponse(
          `No place found with the ID of ${placeId}`,
          404
        );
      res.status(201).json({
        success: true,
        message: `Place updates saved in the Database. Edited ${result.__v} times.`,
        status: 201,
        data: result
      });
    })
    .catch((error) => {
      next(error);
    });
});

router.delete('/delete/:placeId', routeGuard, (req, res, next) => {
  const { placeId } = req.params;

  Place.findByIdAndDelete(placeId)
    .then((result) => {
      if (!result)
        throw new ErrorResponse(
          `No place found with the ID of ${placeId}`,
          404
        );
      res.status(200).json({
        success: true,
        message: `Place with ID  deleted successfully`,
        status: 200
      });
    })
    .catch((error) => {
      next(error);
    });
});

module.exports = router;
