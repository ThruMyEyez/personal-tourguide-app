'use strict';

const express = require('express');
const router = express.Router();

const User = require('../models/user');
const Follow = require('../models/follow');
const Profile = require('../models/profile');

const { routeGuard } = require('../middleware/route-guard');

// Getting complete data of current user & check,
// if he has role privileges. If true, then populate extra data
// based on the role.
router.get('/', routeGuard, (req, res, next) => {
  const { _id } = req.payload;

  User.findOne({ _id })
    // WIP

    .catch((error) => {
      next(error);
    });
});

router.get('/:purshaseId', (req, res, next) => {});

router.get('/purchase-history', (req, res, next) => {});

router.get('/:id', (req, res, next) => {});

// Following a specific user. :id Is the targetUser to be followed
// This route checks first if the current user is already following target User
router.post('/:id/follow', routeGuard, (req, res, next) => {
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
router.delete('/:id/unfollow', routeGuard, (req, res, next) => {
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

// to update a specific user role up or down. Target roles are "user", "provider", "admin" and delivered,
// with req.params.role
router.put('/:id/:targetRole', routeGuard, (req, res, next) => {
  const { _id } = req.payload;
  const { id, targetRole } = req.params; // Target userId & Role
  User.findOne({ _id })
    .then((foundUser) => {
      if (foundUser.role !== 'admin') {
        res.status(401).json({
          success: false,
          message: `Task requires Administrativ privileges for ${foundUser.name}`
        });
      } else {
        return User.findByIdAndUpdate(id, {
          role: targetRole,
          $inc: { __v: 1 }
        });
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

module.exports = router;
