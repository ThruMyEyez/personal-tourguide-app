'use strict';

const express = require('express');
const router = express.Router();

const Place = require('./../models/place');

//Get all places from the current user
router.get('/', (req, res, next) => {
  Place.find({ userId: req.body.id })
    .then((places) => {
      console.log(places);
      res.status(200).json({ places: places });
    })
    .catch((error) => next(error));
});

router.post('/create', (req, res, next) => {
  console.log(req.body);
  req.body.title === '' &&
    res.status(204).json({ message: 'Title can not be empty' });

  // ToDo Check user role - normal users not allowed to create
  Place.create(req.body)
    .then((result) => {
      console.log(result);
      res.status(200).json({ message: 'Place saved in the Database' });
    })
    .catch((error) => next(error));
});

router.put('/edit/:placeId/', (req, res, next) => {});

router.delete('/delete/:placeId', (req, res, next) => {});

module.exports = router;
