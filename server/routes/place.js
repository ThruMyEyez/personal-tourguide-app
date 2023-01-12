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
  console.log('ID: ', _id);
  Place.find({ userId: _id })
    .then((places) => {
      //if (!places) next(new ErrorResponse('No Places found!', 400));
      console.log('places: ', places);
      res.status(200).json({
        status: 200,
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

  if (!title)
    res.status(400).json({
      status: 400,
      message: 'Title must be provided! No place created!'
    });

  const isPlace = await Place.findOne({ title: title }).exec();

  if (isPlace)
    next(
      new ErrorResponse(`A Place with the title ${title} already exist's!`, 409)
    );
  //Bug free so far
  const newPlace = new Place({ ...req.body, userId: _id });
  newPlace
    .save()
    .then((place) => {
      res.status(201).json({
        success: true,
        status: 201,
        message: `Place: ${place.title} saved in the Database`,
        data: place
      });
    })
    .catch((error) => {
      modelValidationErrorHelper(error);
      next(error);
    });

  // Creates bugs + result
  //Place.create({ ...req.body, userId: _id }, { new: true })
  //  .then((result) => {
  //    res.status(201).json({
  //      success: true,
  //      message: 'Place saved in the Database',
  //      data: result
  //    });
  //  })
  //  .catch((error) => {
  //    modelValidationErrorHelper(error);
  //    next(error);
  //  });
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
        message: `Place with ID ${placeId} deleted successfully`,
        status: 200
      });
    })
    .catch((error) => {
      next(error);
    });
});

module.exports = router;
