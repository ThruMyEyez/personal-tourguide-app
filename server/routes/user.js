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
// If he has a providerProfile than it will be included in the response Object.
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

//WIP
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

//redudant 🙄 its included above
//router.get('/purchase-history', (req, res, next) => {});
router.get('/purchases/:purshaseId', (req, res, next) => {});

// Following a specific user. req.body.followee Is the target user to be followed
// This route checks first if the current user is already following target User
router.post('/follow/', routeGuard, async (req, res, next) => {
  const { followee } = req.body;
  const { _id } = req.payload;
  const isFollowing = await Follow.findOne({
    followee: followee,
    follower: _id
  });

  if (isFollowing)
    next(new ErrorResponse(`you already a follower of ${followee}`, 400));

  const newFollowing = new Follow({ followee: followee, follower: _id });
  newFollowing
    .save()
    .then((newFollowing) => {
      res.status(201).json({
        success: true,
        message: `userId: ${newFollowing.follower} is now following ${newFollowing.followee}`,
        data: newFollowing
      });
    })
    .catch((error) => {
      modelValidationErrorHelper(error);
      next(error);
    });
});

// Unfollowing a specific user. :id Is the targetUser to be unfollowed
router.delete('/unfollow/:id/', routeGuard, (req, res, next) => {
  console.log(true);
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
  //const { targetRole } = req.body;
  console.log(req.body);
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
            ...req.body,
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

// If the user.role is "provider" or "admin", user can create a provider profile
router.post('/new-provider-profile', routeGuard, async (req, res, next) => {
  const { _id, role } = req.payload;

  if (role === 'provider' || 'admin') {
    const providerProfile = await Profile.findOne(
      { userId: _id },
      { explicit: true }
    ).exec();

    if (providerProfile)
      next(
        new ErrorResponse(`user with id: ${_id} has already a Profile!`, 409)
      );

    const newProfile = new Profile({ ...req.body, userId: _id });
    newProfile
      .save()
      .then((createdProfile) => {
        res.status(201).json({
          success: true,
          status: 201,
          message: `Profile for userId: ${createdProfile.userId} saved in the Database`,
          data: createdProfile
        });
      })
      .catch((error) => {
        modelValidationErrorHelper(error);
        next(error);
      });
  } else {
    next(new ErrorResponse('invalid permissions', 403));
  }
});

// If the user.role is "provider" or "admin", user can update his provider profile
router.put('/edit-profile/', routeGuard, (req, res, next) => {
  //const { profileId } = req.params;
  const { _id, role, name } = req.payload;

  if (role === 'provider' || 'admin') {
    Profile.findOneAndUpdate(
      { userId: _id },
      //Profile.findByIdAndUpdate(
      //  profileId,
      { ...req.body, $inc: { __v: 1 } },
      { new: true }
    )
      .then((updatedProfile) => {
        if (!updatedProfile)
          next(
            new ErrorResponse(
              `The provider ${name} has no profile created. Please create one before you create Products!`,
              404
            )
          );
        res.status(201).json({
          success: true,
          message: `Place updates saved in the Database. Edited ${updatedProfile.__v} times.`,
          status: 201,
          data: updatedProfile
        });
      })
      .catch((error) => {
        modelValidationErrorHelper(error);
        next(error);
      });
  }
});

module.exports = router;
