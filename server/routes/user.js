'use strict';

const express = require('express');
const router = express.Router();

const User = require('../models/user');
const Follow = require('../models/follow');
const Profile = require('../models/profile');
const Purchase = require('../models/purchase');
const Place = require('../models/place');

const { routeGuard } = require('../middleware/route-guard');
const {
  ErrorResponse,
  modelValidationErrorHelper
} = require('../utils/ErrorHelper');

// Getting complete data of current user & check,
// if he has role privileges. If true, then populate extra data
// based on the role.
router.get('/', routeGuard, async (req, res, next) => {
  const { _id } = req.payload;

  //ProviderProfile returns null if no profile
  const providerProfile = await Profile.findOne(
    { userId: _id },
    { explicit: true }
  ).exec();

  User.findById({ _id })
    .select('-passwordHashAndSalt') // hidden for security
    .then((user) => {
      if (!user)
        throw new ErrorResponse(
          `No logged in user! This should not happen!  UserId: ${id}`,
          418
        );

      res.status(200).json({
        success: true,
        message: `User ${user.name} is a ${
          user.role !== 'user' ? user.role : 'customer'
        }`,
        user: { ...user._doc, providerProfile: providerProfile }
      });
    })
    .catch((error) => {
      next(error);
    });
});

router.get('/purchases', routeGuard, (req, res, next) => {
  const { _id } = req.payload;
  Place.find({ userId: _id }).then((places) => {
    res.status(200).json({
      success: true,
      message: `${places.length} provider generated places found`,
      places: places,
      status: 200
    });
    console.log('places found: ', places);
  });
});

router.get('/purchases/:purshaseId', (req, res, next) => {});

router.get('/purchase-history', (req, res, next) => {});

// Following a specific user. :id Is the targetUser to be followed
// This route checks first if the current user is already following target User
router.post('follow/:id/', routeGuard, (req, res, next) => {
  const { id } = req.params;
  const { _id } = req.payload;

  Follow.findOne({ follower: _id, followee: id })
    .then((result) => {
      if (result) {
        res.status(418).json({
          success: false,
          message: `you already a follower of ${id}`
        });
      } else {
        return Follow.create({ follower: _id, followee: id });
      }
    })
    .then((result) => {
      result &&
        res.status(201).json({
          success: true,
          message: `you followed to ${id}`
        });
    })
    .catch((error) => {
      next(error);
    });
});

//Unfollowing a specific user. :id Is the targetUser to be unfollowed
router.delete('unfollow/:id/', routeGuard, (req, res, next) => {
  const { id } = req.params;
  const { _id } = req.payload;
  Follow.findOneAndDelete({ follower: _id, followee: id })
    .then((result) => {
      console.log('result: ', result);
      !result &&
        res.status(200).json({
          success: false,
          message: `you don't follow ${id}`
        });
      result &&
        res.status(200).json({
          success: true,
          message: `you unfollowed ${id}`
        });
    })
    .catch((error) => {
      next(error);
    });
});

// to update a specific user role up or down. Target roles are "user", "provider", "admin".
// with req.params.role
router.put('/update-role/:id/', routeGuard, (req, res, next) => {
  const { _id } = req.payload;
  const { id } = req.params; // Target userId & Role
  const { targetRole } = req.body;

  User.findOne({ _id })
    .then((foundUser) => {
      if (foundUser.role !== 'admin') {
        throw new ErrorResponse(
          `Task requires Administrativ privileges for ${foundUser.name}`,
          403
        );
        //res.status(403).json({
        //  success: false,
        //  message: `Task requires Administrativ privileges for ${foundUser.name}`
        //});
      } else {
        return User.findByIdAndUpdate(
          id,
          {
            role: targetRole,
            $inc: { __v: 1 }
          },
          { new: true }
        );
      }
    })
    .then((result) => {
      result &&
        res.status(200).json({
          success: true,
          message: `User ${result.name}'s role has been updated to ${result.role}`
        });
    })
    .catch((error) => {
      next(error);
    });
});

// get userData of specific user to show up for everyone
// if the user is a provider get additional provider profile data
// for public display
router.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  const providerProfile = await Profile.findOne(
    { userId: id },
    { explicit: true }
  ).exec();

  User.findById({ _id: id })
    .select('-passwordHashAndSalt -updatedAt')
    .then((foundUser) => {
      if (!foundUser) {
        throw new ErrorResponse(`No user with the id: ${id}`, 404);
      }
      const { role, name } = foundUser;

      res.status(200).json({
        message: `Found user: ${name}, role: ${role}`,
        status: 200,
        data: { ...foundUser._doc, providerProfile: providerProfile }
      });
    })
    .catch((error) => {
      next(error);
    });
});

module.exports = router;
