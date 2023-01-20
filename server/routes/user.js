'use strict';

const express = require('express');
const router = express.Router();

const User = require('../models/user');
const Follow = require('../models/follow');
const Profile = require('../models/profile');
const Purchase = require('../models/purchase');
const Place = require('../models/place');
const Ratings = require('../models/rating');

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
    { userId: _id }
    // { explicit: true } TODO: Makes the provider profile a id instead of an object
  ).exec();
  User.findById({ _id })
    .select('-passwordHashAndSalt') // hidden for security
    .then((user) => {
      if (!user)
        throw new ErrorResponse(
          `No logged in user! This should not happen!  UserId: ${_id}`,
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

// Get all users from DB
router.get('/all/', async (req, res, next) => {
  try {
    const allUser = await User.find({});
    console.log(allUser);
    allUser &&
      res.status(200).json({
        message: `${allUser.length} Providers fetched from DB`,
        data: allUser
      });
  } catch (error) {
    next(error);
  }
});

//WIP
router.get('/purchases', routeGuard, (req, res, next) => {
  const { _id } = req.payload;
  Purchase.find({ userId: _id }).then((purchases) => {
    res.status(200).json({
      success: true,
      message: `${purchases.length} provider generated purchases found`,
      purchases: purchases,
      status: 200
    });
  });
});

//redudant 🙄 its included above
//router.get('/purchase-history', (req, res, next) => {});
router.get('/purchases/:purshaseId', (req, res, next) => {
  // const { purchaseId } = req.params;
  // console.log('OLAOLA', purchaseId);
  // Purchase.find({ userId: purchaseId }).then((purchases) => {
  //   res.status(200).json({
  //     success: true,
  //     message: `${purchases.length} provider generated purchases found`,
  //     places: purchases,
  //     status: 200
  //   });
  //   console.log('places found: ', purchases);
  // });
});

//Gets a Following document if exists
router.get('/followed/:id', routeGuard, (req, res, next) => {
  const { id } = req.params;
  const { _id } = req.payload;
  console.log(_id, id);
  Follow.findOne({
    followee: id,
    follower: _id
  })
    .then((newFollowing) => {
      if (!newFollowing) {
        res.json({
          success: true,
          message: `you do not follow ${id}`
        });
      } else {
        res.status(201).json({
          success: true,
          message: `userId: ${newFollowing.follower} is  following ${newFollowing.followee}`,
          data: newFollowing
        });
      }
    })
    .catch((error) => {
      next(error);
    });
});

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
        res.json({
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

// Update User Information
router.put('/update', routeGuard, async (req, res, next) => {
  const { _id } = req.payload;

  const foundUser = await User.findOne({ _id });
  if (foundUser) {
    const updatedUser = { ...req.body, __v: foundUser.__v + 1 };
    User.findByIdAndUpdate(_id, updatedUser, { new: true })
      .then((result) => {
        console.log('THIS IS THE BACKEND', result);
        result &&
          res.status(200).json({
            success: true,
            message: `User ${result.name} has been updated to ${result.role} Edited ${result.__v} times.`
          });
      })
      .catch((error) => {
        next(error);
      });
  } else {
    next(new ErrorResponse('No User found', 404));
  }
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
    Profile.findOne({ userId: _id })
      .then((profile) => {
        if (!profile)
          next(
            new ErrorResponse(
              `The provider ${name} has no profile created. Please create one before you create Products!`,
              404
            )
          );
        const updatedProfile = { ...req.body, __v: profile.__v + 1 };
        return Profile.findOneAndUpdate({ _id: profile._id }, updatedProfile, {
          new: true
        }).then((updatedProfile) => {
          console.log('Updated Profile:', updatedProfile);
          res.status(201).json({
            success: true,
            message: `Place updates saved in the Database. Edited ${updatedProfile.__v} times.`,
            status: 201,
            data: updatedProfile
          });
        });
      })
      .catch((err) => next(err));
  }
});

// get userData of specific user to show up for everyone
// if the user is a provider get additional provider profile data
// for public display
router.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  console.log(id);
  const providerProfile = await Profile.findOne(
    { userId: id }
    // { explicit: true } TODO: Makes the provider profile a id instead of an object
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
